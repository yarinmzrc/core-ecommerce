"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function Nav({
  scrolled,
  children,
}: {
  scrolled: boolean
  children: React.ReactNode
}) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-50 flex w-full items-center bg-white px-4 shadow-md transition-all duration-300",
        scrolled ? "h-14" : "h-20",
      )}
    >
      {children}
    </nav>
  )
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        "hover:text-secondary-foreground focus-visible:text-secondary-foreground underline-animate font-medium",
        pathname === props.href && "underline-active",
      )}
      style={
        { "--underline-color": "var(--color-primary)" } as React.CSSProperties
      }
    />
  )
}
