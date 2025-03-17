"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Inbox, Send, FileEdit, Briefcase, User, Tag, Trash2, AlertCircle, Settings, LogOut, Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/common/Logo"
import { Badge } from "@/components/ui/badge"

export function MailSidebar() {
  const pathname = usePathname()
  const [categories] = useState([
    { name: "Work", icon: Briefcase, count: 12 },
    { name: "Personal", icon: User, count: 5 },
    { name: "Updates", icon: Tag, count: 3 },
  ])

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <Logo />
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <Button className="mx-4 mb-2 mt-2 gap-2" size="sm">
            <Plus className="h-4 w-4" />
            Compose
          </Button>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Mail</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/" || pathname === "/inbox"}>
                  <Link href="/inbox">
                    <Inbox className="h-4 w-4" />
                    <span>Inbox</span>
                    <Badge className="ml-auto" variant="secondary">
                      24
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/sent"}>
                  <Link href="/sent">
                    <Send className="h-4 w-4" />
                    <span>Sent</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/drafts"}>
                  <Link href="/drafts">
                    <FileEdit className="h-4 w-4" />
                    <span>Drafts</span>
                    <Badge className="ml-auto" variant="secondary">
                      3
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/category/${category.name.toLowerCase()}`}
                  >
                    <Link href={`/category/${category.name.toLowerCase()}`}>
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                      {category.count > 0 && (
                        <Badge className="ml-auto" variant="secondary">
                          {category.count}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/categories">
                    <Plus className="h-4 w-4" />
                    <span>Add Category</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/trash"}>
                  <Link href="/trash">
                    <Trash2 className="h-4 w-4" />
                    <span>Trash</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/spam"}>
                  <Link href="/spam">
                    <AlertCircle className="h-4 w-4" />
                    <span>Spam</span>
                    <Badge className="ml-auto" variant="secondary">
                      7
                    </Badge>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings"}>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/login">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

