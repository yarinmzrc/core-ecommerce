import { OptionTemplate, OptionValue } from "@repo/api-types"

import { OptionTemplate as PrismaOptionTemplate } from "../../../prisma/generated/prisma/client"

export function mapOptionTemplate(
  option: PrismaOptionTemplate,
): OptionTemplate {
  return {
    id: option.id,
    name: option.name,
    appType: option.appType,
    inputType: option.inputType,
    uiType: option.uiType,
    pricingStrategy: option.pricingStrategy,
    values: option.values as OptionValue[],
    createdAt: option.createdAt,
    updatedAt: option.updatedAt,
  }
}
