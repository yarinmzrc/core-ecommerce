"use client"

import { useTranslations } from "next-intl"

import { PageHeader } from "@/app/admin/_components/page-header"
import { OptionTemplatesForm } from "@/features/option-templates/components/form"

export default function AdminNewOptionTemplatePage() {
  const t = useTranslations("admin.optionTemplates")

  return (
    <div className="flex flex-col gap-4">
      <PageHeader>{t("pages.create")}</PageHeader>
      <OptionTemplatesForm key="new" />
    </div>
  )
}
