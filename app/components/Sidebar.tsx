import Link from "next/link"
import { headers } from "next/headers"
import { cn } from "@/lib/utils"
import { navigationItems, type NavItem } from "../lib/navigation"
import { CollapsibleNavSection } from "./CollapsibleNavSection"
import * as Icons from "lucide-react"
import Image from "next/image"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

interface SidebarProps {
  organizationName: string
  organizationLogo?: string | StaticImport
}

export async function Sidebar({ organizationName, organizationLogo }: SidebarProps) {
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || "/"

  return (
    <div className="fixed inset-y-0 left-0 w-64 flex flex-col border-r bg-gray-50">
      {/* Branding Section */}
      <div className="flex items-center px-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          {organizationLogo && (
            <Image
              src={organizationLogo} 
              alt={`${organizationName} logo`}
              className="w-full h-auto"
            />
          )}
        </Link>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-0.5 px-2">
          {navigationItems.map((item) => (
            <NavItemComponent 
              key={item.href} 
              item={item} 
              pathname={pathname}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}

function NavItemComponent({ 
  item, 
  pathname 
}: { 
  item: NavItem
  pathname: string 
}) {
  const isActive = pathname === item.href
  const hasSubItems = item.subItems && item.subItems.length > 0
  const Icon = item.iconName ? Icons[item.iconName as keyof typeof Icons] as Icons.LucideIcon : null

  if (!hasSubItems) {
    return (
      <Link href={item.href}>
        <div
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            isActive 
              ? "bg-gray-100 text-gray-900" 
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          {Icon && <Icon className="h-4 w-4" />}
          {item.title}
        </div>
      </Link>
    )
  }

  return (
    <CollapsibleNavSection 
      item={item} 
      pathname={pathname}
    />
  )
} 