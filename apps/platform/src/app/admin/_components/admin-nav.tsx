"use client"

import { useTranslations } from "next-intl"

import { Nav, NavLink } from "@/components/nav"
import { paths } from "@/config/paths"
import { useScroll } from "@/hooks/use-scroll"

export function AdminNav() {
  const t = useTranslations("admin.nav")

  const scrolled = useScroll()

  return (
    <Nav scrolled={scrolled}>
      <div className="flex flex-1 items-center justify-center gap-4">
        <NavLink href={paths.admin.root.getHref()}>{t("home")}</NavLink>
        <NavLink href={paths.admin.products.root.getHref()}>
          {t("products")}
        </NavLink>
        <NavLink href={paths.admin.categories.root.getHref()}>
          {t("categories")}
        </NavLink>
        <NavLink href={paths.admin.orders.root.getHref()}>
          {t("orders")}
        </NavLink>
        <NavLink href={paths.admin.optionTemplates.root.getHref()}>
          {t("optionTemplates")}
        </NavLink>
      </div>
    </Nav>
  )
}
