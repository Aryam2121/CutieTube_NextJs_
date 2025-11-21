"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Shield,
  AlertTriangle,
  Ban,
  CheckCircle,
  XCircle,
  Flag,
  Eye,
  MessageSquare,
  User,
  Clock,
  TrendingUp,
  Filter,
  Search,
  UserX,
  Play,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ContentReport {
  id: string
  type: "video" | "comment" | "user"
  contentId: string
  contentTitle: string
  contentPreview?: string
  thumbnail?: string
  reportedBy: string
  reportedAt: Date
  reason: string
  category: "spam" | "harassment" | "violence" | "hate-speech" | "copyright" | "sexual-content" | "misinformation" | "other"
  status: "pending" | "reviewing" | "resolved" | "dismissed"
  priority: "low" | "medium" | "high" | "critical"
  assignedTo?: string
  notes?: string
}

export function ContentModeration() {
  const [reports, setReports] = useState<ContentReport[]>([
    {
      id: "1",
      type: "video",
      contentId: "v123",
      contentTitle: "Suspicious Tutorial Video",
      thumbnail: "/placeholder.svg",
      reportedBy: "user456",
      reportedAt: new Date("2024-01-20"),
      reason: "Contains misleading information about security practices",
      category: "misinformation",
      status: "pending",
      priority: "high",
    },
    {
      id: "2",
      type: "comment",
      contentId: "c789",
      contentTitle: "Offensive comment on React tutorial",
      contentPreview: "This is a preview of the reported comment...",
      reportedBy: "user123",
      reportedAt: new Date("2024-01-21"),
      reason: "Contains hate speech and harassment",
      category: "harassment",
      status: "reviewing",
      priority: "critical",
      assignedTo: "moderator1",
    },
    {
      id: "3",
      type: "user",
      contentId: "u456",
      contentTitle: "User: SpamAccount123",
      reportedBy: "user789",
      reportedAt: new Date("2024-01-22"),
      reason: "Repeatedly posting spam content",
      category: "spam",
      status: "pending",
      priority: "medium",
    },
  ])

  const [selectedReport, setSelectedReport] = useState<ContentReport | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const stats = {
    totalReports: reports.length,
    pending: reports.filter((r) => r.status === "pending").length,
    reviewing: reports.filter((r) => r.status === "reviewing").length,
    resolved: reports.filter((r) => r.status === "resolved").length,
  }

  const handleTakeAction = (reportId: string, action: "approve" | "reject" | "ban") => {
    const actionMessages = {
      approve: "Content removed successfully",
      reject: "Report dismissed",
      ban: "User banned",
    }

    setReports(
      reports.map((r) =>
        r.id === reportId
          ? { ...r, status: action === "reject" ? "dismissed" : "resolved" }
          : r
      )
    )

    toast.success(actionMessages[action])
    setSelectedReport(null)
  }

  const handleAssignModerator = (reportId: string, moderator: string) => {
    setReports(
      reports.map((r) =>
        r.id === reportId
          ? { ...r, assignedTo: moderator, status: "reviewing" }
          : r
      )
    )
    toast.success("Report assigned")
  }

  const getPriorityColor = (priority: ContentReport["priority"]) => {
    switch (priority) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-blue-500 text-white"
    }
  }

  const getStatusIcon = (status: ContentReport["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "reviewing":
        return <Eye className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "dismissed":
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getCategoryIcon = (category: ContentReport["category"]) => {
    switch (category) {
      case "spam":
        return <Ban className="h-4 w-4" />
      case "harassment":
        return <AlertTriangle className="h-4 w-4" />
      case "violence":
        return <Shield className="h-4 w-4" />
      default:
        return <Flag className="h-4 w-4" />
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesStatus = filterStatus === "all" || report.status === filterStatus
    const matchesPriority =
      filterPriority === "all" || report.priority === filterPriority
    const matchesSearch =
      searchQuery === "" ||
      report.contentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesPriority && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Content Moderation
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and manage reported content
          </p>
        </div>
        <Button variant="outline">
          <TrendingUp className="h-4 w-4 mr-2" />
          View Analytics
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReports}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-500" />
                Reviewing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.reviewing}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.resolved}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-3">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Thumbnail/Icon */}
                  <div className="flex-shrink-0">
                    {report.thumbnail ? (
                      <img
                        src={report.thumbnail}
                        alt=""
                        className="w-32 h-20 rounded object-cover"
                      />
                    ) : (
                      <div className="w-32 h-20 rounded bg-muted flex items-center justify-center">
                        {report.type === "video" && <Play className="h-8 w-8" />}
                        {report.type === "comment" && (
                          <MessageSquare className="h-8 w-8" />
                        )}
                        {report.type === "user" && <User className="h-8 w-8" />}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getPriorityColor(report.priority)}>
                            {report.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {getCategoryIcon(report.category)}
                            <span className="ml-1 capitalize">{report.category}</span>
                          </Badge>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(report.status)}
                            <span className="text-sm text-muted-foreground capitalize">
                              {report.status}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">
                          {report.contentTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {report.reason}
                        </p>
                        {report.contentPreview && (
                          <p className="text-sm italic text-muted-foreground mb-2">
                            "{report.contentPreview}"
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Reported by: {report.reportedBy}</span>
                          <span>
                            {report.reportedAt.toLocaleDateString()} at{" "}
                            {report.reportedAt.toLocaleTimeString()}
                          </span>
                          {report.assignedTo && (
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              Assigned to: {report.assignedTo}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                      {report.status === "pending" && (
                        <Select
                          onValueChange={(v) => handleAssignModerator(report.id, v)}
                        >
                          <SelectTrigger className="w-40 h-9">
                            <SelectValue placeholder="Assign to..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="moderator1">Moderator 1</SelectItem>
                            <SelectItem value="moderator2">Moderator 2</SelectItem>
                            <SelectItem value="moderator3">Moderator 3</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Review Dialog */}
      {selectedReport && (
        <Dialog
          open={!!selectedReport}
          onOpenChange={() => setSelectedReport(null)}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Review Report</DialogTitle>
              <DialogDescription>
                Take action on this reported content
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Report Details */}
              <div>
                <h3 className="font-semibold mb-3">Report Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Content Type:</span>
                    <Badge>{selectedReport.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="outline">{selectedReport.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority:</span>
                    <Badge className={getPriorityColor(selectedReport.priority)}>
                      {selectedReport.priority}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="secondary">{selectedReport.status}</Badge>
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              <div>
                <h3 className="font-semibold mb-3">Content</h3>
                {selectedReport.thumbnail && (
                  <img
                    src={selectedReport.thumbnail}
                    alt=""
                    className="w-full rounded-lg mb-3"
                  />
                )}
                <p className="text-sm">{selectedReport.contentTitle}</p>
                {selectedReport.contentPreview && (
                  <p className="text-sm italic text-muted-foreground mt-2">
                    "{selectedReport.contentPreview}"
                  </p>
                )}
              </div>

              {/* Reason */}
              <div>
                <h3 className="font-semibold mb-3">Report Reason</h3>
                <p className="text-sm">{selectedReport.reason}</p>
              </div>

              {/* Moderator Notes */}
              <div>
                <h3 className="font-semibold mb-3">Add Notes (Optional)</h3>
                <Textarea
                  placeholder="Add internal notes about this report..."
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleTakeAction(selectedReport.id, "reject")
                  }
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Dismiss Report
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleTakeAction(selectedReport.id, "ban")}
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Ban User
                </Button>
                <Button
                  onClick={() => handleTakeAction(selectedReport.id, "approve")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Remove Content
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
