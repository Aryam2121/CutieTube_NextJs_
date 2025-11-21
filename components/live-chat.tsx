"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  Heart,
  DollarSign,
  MoreVertical,
  Pin,
  Flag,
  UserX,
  Smile,
  Gift,
  Zap,
  Crown,
  Shield,
  MessageSquare,
  Users,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ChatMessage {
  id: string
  userId: string
  username: string
  avatar?: string
  message: string
  timestamp: Date
  type: "normal" | "super-chat" | "membership" | "moderator" | "owner"
  amount?: number
  isPinned?: boolean
  badges?: ("verified" | "moderator" | "member" | "vip")[]
}

interface LiveChatProps {
  streamId: string
  isOwner?: boolean
  isModerator?: boolean
  className?: string
}

export function LiveChat({
  streamId,
  isOwner = false,
  isModerator = false,
  className,
}: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState<"chat" | "top">("chat")
  const [isSlowMode, setIsSlowMode] = useState(false)
  const [viewerCount, setViewerCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [pinnedMessage, setPinnedMessage] = useState<ChatMessage | null>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Mock real-time messages
  useEffect(() => {
    const mockUsers = [
      { id: "1", name: "TechGuru123", avatar: "/placeholder.svg" },
      { id: "2", name: "CodeMaster", avatar: "/placeholder.svg" },
      { id: "3", name: "StreamFan99", avatar: "/placeholder.svg" },
      { id: "4", name: "DevExpert", avatar: "/placeholder.svg" },
    ]

    const mockMessages = [
      "Great stream! 🔥",
      "Can you explain that again?",
      "This is awesome!",
      "Thanks for the tutorial",
      "Subscribed! 💙",
      "Love this content",
      "Keep up the good work!",
      "When is the next stream?",
    ]

    const interval = setInterval(() => {
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]
      const randomMsg = mockMessages[Math.floor(Math.random() * mockMessages.length)]
      
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        userId: randomUser.id,
        username: randomUser.name,
        avatar: randomUser.avatar,
        message: randomMsg,
        timestamp: new Date(),
        type: Math.random() > 0.95 ? "super-chat" : "normal",
        amount: Math.random() > 0.95 ? Math.floor(Math.random() * 50) + 5 : undefined,
        badges: Math.random() > 0.8 ? ["member"] : undefined,
      }

      setMessages((prev) => [...prev, newMsg])
      setViewerCount((prev) => Math.max(100, prev + Math.floor(Math.random() * 10 - 5)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const msg: ChatMessage = {
      id: Date.now().toString(),
      userId: "current-user",
      username: "You",
      message: newMessage,
      timestamp: new Date(),
      type: isOwner ? "owner" : isModerator ? "moderator" : "normal",
      badges: [
        ...(isOwner ? ["verified" as const] : []),
        ...(isModerator ? ["moderator" as const] : []),
      ],
    }

    setMessages([...messages, msg])
    setNewMessage("")
    toast.success("Message sent")
  }

  const handlePinMessage = (msg: ChatMessage) => {
    setPinnedMessage(msg)
    toast.success("Message pinned")
  }

  const handleDeleteMessage = (msgId: string) => {
    setMessages(messages.filter((m) => m.id !== msgId))
    toast.success("Message deleted")
  }

  const handleTimeoutUser = (userId: string) => {
    toast.success("User timed out for 5 minutes")
  }

  const handleBanUser = (userId: string) => {
    toast.success("User banned from chat")
  }

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "verified":
        return <Crown className="h-3 w-3 text-yellow-500" />
      case "moderator":
        return <Shield className="h-3 w-3 text-blue-500" />
      case "member":
        return <Heart className="h-3 w-3 text-pink-500" />
      case "vip":
        return <Zap className="h-3 w-3 text-purple-500" />
      default:
        return null
    }
  }

  const getMessageBorderColor = (type: ChatMessage["type"]) => {
    switch (type) {
      case "super-chat":
        return "border-l-4 border-yellow-500 bg-yellow-500/10"
      case "membership":
        return "border-l-4 border-green-500 bg-green-500/10"
      case "owner":
        return "border-l-4 border-primary bg-primary/10"
      case "moderator":
        return "border-l-4 border-blue-500 bg-blue-500/10"
      default:
        return ""
    }
  }

  return (
    <div className={cn("flex flex-col h-full bg-background border rounded-lg", className)}>
      {/* Header */}
      <div className="p-3 border-b flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat" className="text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              Live Chat
            </TabsTrigger>
            <TabsTrigger value="top" className="text-xs">
              <DollarSign className="h-3 w-3 mr-1" />
              Top Chat
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 ml-2">
          <Badge variant="secondary" className="text-xs">
            <Users className="h-3 w-3 mr-1" />
            {viewerCount.toLocaleString()}
          </Badge>
          {(isOwner || isModerator) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsSlowMode(!isSlowMode)}>
                  Slow Mode {isSlowMode ? "Off" : "On"}
                </DropdownMenuItem>
                <DropdownMenuItem>Subscribers Only</DropdownMenuItem>
                <DropdownMenuItem>Members Only</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Clear Chat</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Pinned Message */}
      <AnimatePresence>
        {pinnedMessage && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b bg-muted/50"
          >
            <div className="p-2 flex items-start gap-2">
              <Pin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs font-semibold">
                    {pinnedMessage.username}
                  </span>
                  <span className="text-xs text-muted-foreground">pinned</span>
                </div>
                <p className="text-sm line-clamp-2">{pinnedMessage.message}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setPinnedMessage(null)}
              >
                ×
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <ScrollArea className="flex-1 p-2" ref={scrollRef}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn(
                "mb-2 p-2 rounded-lg group hover:bg-accent transition-colors",
                getMessageBorderColor(msg.type)
              )}
            >
              <div className="flex items-start gap-2">
                <Avatar className="h-6 w-6 flex-shrink-0">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>{msg.username[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-xs font-semibold">{msg.username}</span>
                    {msg.badges?.map((badge, idx) => (
                      <span key={idx}>{getBadgeIcon(badge)}</span>
                    ))}
                    {msg.amount && (
                      <Badge variant="default" className="text-xs bg-yellow-500">
                        ${msg.amount}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm mt-0.5 break-words">{msg.message}</p>
                </div>

                {(isOwner || isModerator) && msg.userId !== "current-user" && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handlePinMessage(msg)}>
                          <Pin className="h-4 w-4 mr-2" />
                          Pin Message
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteMessage(msg.id)}>
                          <Flag className="h-4 w-4 mr-2" />
                          Delete Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleTimeoutUser(msg.userId)}>
                          <UserX className="h-4 w-4 mr-2" />
                          Timeout User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleBanUser(msg.userId)}
                          className="text-destructive"
                        >
                          <UserX className="h-4 w-4 mr-2" />
                          Ban User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>

      {/* Input */}
      <div className="p-2 border-t">
        {isSlowMode && (
          <div className="mb-2 text-xs text-center text-muted-foreground bg-muted p-1 rounded">
            Slow mode is on. You can send 1 message every 5 seconds.
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Say something..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Gift className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
