"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function Nav({ children }: React.PropsWithChildren) {
  return (
    <nav className="bg-primary text-primary-foreground px-4">{children}</nav>
  )
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        "hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground inline-flex p-4",
        pathname === props.href && "bg-background text-foreground",
      )}
    />
  )
}
