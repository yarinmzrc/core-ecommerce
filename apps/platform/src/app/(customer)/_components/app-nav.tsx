"use client"

import { useTranslations } from "next-intl"

import { Nav, NavLink } from "@/components/nav"
import { paths } from "@/config/paths"
import { CartSheet } from "@/core/cart/components/cart-drawer"
import { useScroll } from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"

export function AppNav() {
  const t = useTranslations("nav")
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
        <NavLink href={paths.app.root.getHref()}>{t("home")}</NavLink>
        <NavLink href={paths.app.products.root.getHref()}>
          {t("products")}
        </NavLink>
        <NavLink href={paths.app.categories.getHref()}>
          {t("categories")}
        </NavLink>
      </div>
      <CartSheet />
    </Nav>
  )
}
