import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button/button"
import { paths } from "@/config/paths"
import { OptionTemplatesTable } from "@/features/option-templates/components/option-templates-table"
import { getOptionTemplates } from "@/features/option-templates/dal/queries"

import { PageHeader } from "../../_components/page-header"

export default async function AdminOptionTemplatesPage() {
  const t = await getTranslations("admin.optionTemplates")

  const optionTemplates = await getOptionTemplates()

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <PageHeader>{t("title")}</PageHeader>
        <Button asChild>
          <Link href={paths.admin.optionTemplates.new.getHref()}>
            {t("actions.add")}
          </Link>
        </Button>
      </div>
      <OptionTemplatesTable options={optionTemplates} />
    </>
  )
}
