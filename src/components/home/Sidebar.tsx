import * as React from "react"
import { ChevronLeft } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { sidebarData } from "@/lib/sidebar-data"
import SidebarMotionDiv from "./SidebarMotionDiv"
import Link from "next/link"
import { FaHome } from "react-icons/fa"
import { TbPerfume } from "react-icons/tb";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>

      <Link href='/' className="m-3 text-purple-700 flex items-center gap-1">
        خانه
        <FaHome />
      </Link>

      <Link href='/brands' className="m-3 text-purple-700 flex items-center gap-1">
        برندها
        <TbPerfume />
      </Link>

      <SidebarHeader>
        دسته بندی
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {sidebarData.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}
                  {" "}
                  <ChevronLeft className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 text-destructive mt-0.5" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="mr-3">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMotionDiv key={item.title}>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMotionDiv>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
