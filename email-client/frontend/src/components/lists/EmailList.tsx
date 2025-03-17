"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { Star, StarOff, Paperclip } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// Sample email data
const emails = [
  {
    id: "1",
    from: "John Smith",
    email: "john.smith@example.com",
    subject: "Weekly Team Meeting Notes",
    preview:
      "Here are the notes from our weekly team meeting. We discussed the upcoming project deadlines and resource allocation.",
    date: new Date(2023, 3, 15, 10, 23),
    read: true,
    starred: true,
    hasAttachment: true,
    labels: ["Work"],
  },
  {
    id: "2",
    from: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Product Launch Update",
    preview:
      "The marketing team has finalized the materials for our upcoming product launch. Please review the attached documents.",
    date: new Date(2023, 3, 14, 15, 45),
    read: false,
    starred: false,
    hasAttachment: true,
    labels: ["Work", "Important"],
  },
  {
    id: "3",
    from: "Michael Brown",
    email: "michael.b@example.com",
    subject: "Vacation Request",
    preview:
      "I would like to request vacation time from July 15 to July 25. Please let me know if this works with our schedule.",
    date: new Date(2023, 3, 14, 9, 12),
    read: true,
    starred: false,
    hasAttachment: false,
    labels: ["Personal"],
  },
  {
    id: "4",
    from: "Emily Davis",
    email: "emily.d@example.com",
    subject: "Client Feedback on Project X",
    preview:
      "I just got off a call with the client regarding Project X. They had some feedback that I wanted to share with the team.",
    date: new Date(2023, 3, 13, 16, 30),
    read: false,
    starred: true,
    hasAttachment: false,
    labels: ["Work", "Client"],
  },
  {
    id: "5",
    from: "David Wilson",
    email: "david.w@example.com",
    subject: "Happy Birthday!",
    preview:
      "Happy Birthday! Wishing you all the best on your special day. The team has organized a small celebration.",
    date: new Date(2023, 3, 13, 8, 0),
    read: true,
    starred: true,
    hasAttachment: false,
    labels: ["Personal"],
  },
]

export function EmailList() {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [starredEmails, setStarredEmails] = useState<string[]>(
    emails.filter((email) => email.starred).map((email) => email.id),
  )

  const toggleSelect = (id: string) => {
    setSelectedEmails((prev) => (prev.includes(id) ? prev.filter((emailId) => emailId !== id) : [...prev, id]))
  }

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setStarredEmails((prev) => (prev.includes(id) ? prev.filter((emailId) => emailId !== id) : [...prev, id]))
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const isToday =
      date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()

    return isToday ? format(date, "h:mm a") : format(date, "MMM d")
  }

  return (
    <div className="flex flex-col divide-y">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`flex cursor-pointer items-center gap-4 px-4 py-3 hover:bg-muted/50 ${
            !email.read ? "bg-muted/30 font-medium" : ""
          }`}
          onClick={() => {
            /* Handle email click */
          }}
        >
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedEmails.includes(email.id)}
              onCheckedChange={() => toggleSelect(email.id)}
              onClick={(e) => e.stopPropagation()}
              className="h-5 w-5"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={(e) => toggleStar(email.id, e)}
            >
              {starredEmails.includes(email.id) ? (
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-5 w-5" />
              )}
              <span className="sr-only">{starredEmails.includes(email.id) ? "Unstar" : "Star"}</span>
            </Button>
          </div>

          <div className="flex flex-1 flex-col gap-1 overflow-hidden sm:flex-row sm:items-center sm:gap-4">
            <div className="w-40 truncate font-medium sm:w-[180px]">{email.from}</div>

            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="truncate">{email.subject}</span>
                {email.hasAttachment && <Paperclip className="h-4 w-4 shrink-0 text-muted-foreground" />}
                {email.labels.map((label) => (
                  <Badge key={label} variant="outline" className="shrink-0">
                    {label}
                  </Badge>
                ))}
              </div>
              <p className="truncate text-sm text-muted-foreground">{email.preview}</p>
            </div>
          </div>

          <div className="ml-auto whitespace-nowrap text-sm text-muted-foreground">{formatDate(email.date)}</div>
        </div>
      ))}
    </div>
  )
}

