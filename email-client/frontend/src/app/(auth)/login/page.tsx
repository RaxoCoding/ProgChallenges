import { Logo } from "@/components/common/Logo"
import { LoginForm } from "./LoginForm"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 p-4 md:p-8">
        <div className="flex flex-col items-center gap-2">
          <Logo />
          <p className="text-muted-foreground">Sign in to access your emails</p>
        </div>
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
      <footer className="flex items-center justify-center border-t py-4">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MailGo. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

