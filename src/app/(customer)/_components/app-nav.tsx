"use client"

import { Nav, NavLink } from "@/components/nav"
import { paths } from "@/config/paths"
import { CartSheet } from "@/core/cart/components/cart-drawer"
import { useScroll } from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"

export function AppNav() {
  const scrolled = useScroll()
  return (
    <Nav scrolled={scrolled}>
      <p
        className={cn(
          "font-extralight transition-all",
          scrolled ? "text-2xl" : "text-4xl",
        )}
      >
        Catering
      </p>
      <div className="flex flex-1 items-center justify-center gap-4">
        <NavLink href={paths.app.root.getHref()}>דף הבית</NavLink>
        <NavLink href={paths.app.products.root.getHref()}>מוצרים</NavLink>
        <NavLink href={paths.app.categories.getHref()}>קטגוריות</NavLink>
      </div>
      <CartSheet />
    </Nav>
  )
}
