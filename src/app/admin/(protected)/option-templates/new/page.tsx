import { getTranslations } from "next-intl/server"

import { PageHeader } from "@/app/admin/_components/page-header"
import { OptionTemplateForm } from "@/features/option-templates/components/option-template-form"

export default async function AdminNewOptionTemplatePage() {
  const t = await getTranslations("admin.optionTemplates")

  return (
    <div className="flex flex-col gap-4">
      <PageHeader>{t("pages.create")}</PageHeader>
      <OptionTemplateForm />
    </div>
  )
}
