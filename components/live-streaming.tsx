"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Radio, MessageCircle, Settings, Mic, MicOff, VideoOff, Video, Share2, Eye, DollarSign } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { getSupabaseClient } from "@/lib/supabase"
import { toast } from "sonner"

interface LiveStream {
  id: string
  title: string
  description: string
  thumbnail_url: string
  stream_key: string
  is_live: boolean
  viewer_count: number
  chat_enabled: boolean
  created_at: string
  user_id: string
  profiles: {
    username: string
    avatar_url?: string
  }
}

interface ChatMessage {
  id: string
  message: string
  username: string
  avatar_url?: string
  timestamp: string
  is_super_chat?: boolean
  amount?: number
}

export function LiveStreaming() {
  const { user } = useAuth()
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamData, setStreamData] = useState<LiveStream | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [viewerCount, setViewerCount] = useState(0)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [showStreamDialog, setShowStreamDialog] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const supabase = getSupabaseClient()

  const startStream = async (formData: FormData) => {
    if (!user) return

    const title = formData.get("title") as string
    const description = formData.get("description") as string

    try {
      // Create stream record in database
      const { data: stream, error } = await supabase
        .from("live_streams")
        .insert({
          title,
          description,
          user_id: user.id,
          stream_key: generateStreamKey(),
          is_live: true,
          chat_enabled: true,
        })
        .select(`
          *,
          profiles (
            username,
            avatar_url
          )
        `)
        .single()

      if (error) throw error

      setStreamData(stream)
      setIsStreaming(true)
      setShowStreamDialog(false)

      // Initialize WebRTC streaming
      await initializeWebRTC()

      toast.success("Live stream started!")
    } catch (error) {
      toast.error("Failed to start stream")
    }
  }

  const stopStream = async () => {
    if (!streamData) return

    try {
      await supabase.from("live_streams").update({ is_live: false }).eq("id", streamData.id)

      // Stop WebRTC streaming
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop()
      }

      setIsStreaming(false)
      setStreamData(null)
      toast.success("Stream ended")
    } catch (error) {
      toast.error("Failed to stop stream")
    }
  }

  const initializeWebRTC = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isCameraOn,
        audio: isMicOn,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        // Send stream data to streaming server
        // This would typically go to a WebRTC signaling server
        console.log("Stream data:", event.data)
      }

      mediaRecorder.start(1000) // Send data every second
    } catch (error) {
      toast.error("Failed to access camera/microphone")
    }
  }

  const generateStreamKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const sendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !streamData || !user) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      message: newMessage,
      username: user.user_metadata?.username || user.email?.split("@")[0] || "Anonymous",
      avatar_url: user.user_metadata?.avatar_url,
      timestamp: new Date().toISOString(),
    }

    setChatMessages((prev) => [...prev, message])
    setNewMessage("")

    // In a real app, you'd send this to a real-time messaging service
    await supabase.from("stream_chat").insert({
      stream_id: streamData.id,
      user_id: user.id,
      message: newMessage,
    })
  }

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn)
    // Update video track
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !isCameraOn
      }
    }
  }

  const toggleMic = () => {
    setIsMicOn(!isMicOn)
    // Update audio track
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const audioTrack = stream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isMicOn
      }
    }
  }

  useEffect(() => {
    // Simulate viewer count updates
    if (isStreaming) {
      const interval = setInterval(() => {
        setViewerCount((prev) => prev + Math.floor(Math.random() * 5) - 2)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isStreaming])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Live Streaming</h1>
          <p className="text-muted-foreground">{isStreaming ? "You're live!" : "Start your live stream"}</p>
        </div>

        {!isStreaming ? (
          <Dialog open={showStreamDialog} onOpenChange={setShowStreamDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Radio className="h-4 w-4" />
                Go Live
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start Live Stream</DialogTitle>
                <DialogDescription>Set up your live stream details</DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  startStream(formData)
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="title">Stream Title</Label>
                  <Input id="title" name="title" placeholder="What's your stream about?" required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" placeholder="Tell viewers more..." />
                </div>
                <Button type="submit" className="w-full">
                  Start Streaming
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        ) : (
          <Button onClick={stopStream} variant="destructive">
            End Stream
          </Button>
        )}
      </div>

      {isStreaming && streamData && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Stream Preview */}
          <div className="xl:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {streamData.title}
                      <Badge variant="destructive" className="gap-1">
                        <Radio className="h-3 w-3" />
                        LIVE
                      </Badge>
                    </CardTitle>
                    <CardDescription>{streamData.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    {viewerCount} viewers
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />

                  {/* Stream Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button size="sm" variant={isCameraOn ? "default" : "destructive"} onClick={toggleCamera}>
                        {isCameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                      </Button>
                      <Button size="sm" variant={isMicOn ? "default" : "destructive"} onClick={toggleMic}>
                        {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stream Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{viewerCount}</div>
                  <div className="text-sm text-muted-foreground">Current Viewers</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{chatMessages.length}</div>
                  <div className="text-sm text-muted-foreground">Chat Messages</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">$24.50</div>
                  <div className="text-sm text-muted-foreground">Super Chat</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Live Chat */}
          <div className="xl:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{message.username}</span>
                            {message.is_super_chat && (
                              <Badge variant="secondary" className="gap-1">
                                <DollarSign className="h-3 w-3" />${message.amount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <form onSubmit={sendChatMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Say something..."
                      className="flex-1"
                    />
                    <Button type="submit" size="sm">
                      Send
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!isStreaming && (
        <div className="text-center py-12">
          <Radio className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Ready to go live?</h3>
          <p className="text-muted-foreground mb-4">Share your content in real-time with your audience</p>
          <Button onClick={() => setShowStreamDialog(true)} className="gap-2">
            <Radio className="h-4 w-4" />
            Start Your First Stream
          </Button>
        </div>
      )}
    </div>
  )
}
