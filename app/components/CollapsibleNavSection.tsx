'use client'

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import * as Icons from "lucide-react"
import type { NavItem } from "../lib/navigation"

export function CollapsibleNavSection({
  item,
  pathname,
  initialOpen = false,
}: {
  item: NavItem
  pathname: string
  initialOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const Icon = item.iconName ? Icons[item.iconName as keyof typeof Icons] as Icons.LucideIcon : null

  return (
    <Collapsible open={isOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            {item.title}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-all duration-200 ease-in-out",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
        <div className="ml-4 border-l border-gray-200 pl-2">
          {item.subItems?.map((subItem) => (
            <Link key={subItem.href} href={subItem.href}>
              <div
                className={cn(
                  "flex w-full items-center rounded-md px-4 py-2 text-sm transition-colors",
                  pathname === subItem.href 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {subItem.title}
              </div>
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
} 