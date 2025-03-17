"use client"

import type React from "react"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { MailSidebar } from "@/components/layout/MailSidebar"
import { ComposeButton } from "@/components/common/ComposeButton"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <MailSidebar />
        <SidebarInset className="flex flex-col">{children}</SidebarInset>
      </div>
      <ComposeButton />
    </SidebarProvider>
  )
}

