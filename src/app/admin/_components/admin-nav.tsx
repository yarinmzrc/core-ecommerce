"use client"

import { Nav, NavLink } from "@/components/nav"
import { paths } from "@/config/paths"
import { useScroll } from "@/hooks/use-scroll"

export function AdminNav() {
  const scrolled = useScroll()

  return (
    <Nav scrolled={scrolled}>
      <div className="flex flex-1 items-center justify-center gap-4">
        <NavLink href={paths.admin.root.getHref()}>דשבורד</NavLink>
        <NavLink href={paths.admin.products.root.getHref()}>מוצרים</NavLink>
        <NavLink href={paths.admin.categories.root.getHref()}>קטגוריות</NavLink>
        <NavLink href={paths.admin.orders.root.getHref()}>הזמנות</NavLink>
      </div>
    </Nav>
  )
}
