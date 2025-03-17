import { MailTopbar } from "@/components/layout/MailTopbar"
import { EmailList } from "@/components/lists/EmailList"

export default function InboxPage() {
  return (
    <div className="flex h-full flex-col">
      <MailTopbar />
      <div className="flex-1 overflow-auto">
        <EmailList />
      </div>
    </div>
  )
}