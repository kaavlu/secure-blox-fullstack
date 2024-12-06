"use client"

import Link from "next/link"
import Image from "next/image"
import { Home, Clock, HelpCircle } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center px-4 py-2">
          <Image
            src="/placeholder.svg"
            width={150}
            height={150}
            alt="SecureBlox"
            className="mx-auto"
          />
        </Link>
      </SidebarHeader>
      <SidebarFooter>
        {/* Add footer content if needed */}
      </SidebarFooter>
    </Sidebar>
  )
}

