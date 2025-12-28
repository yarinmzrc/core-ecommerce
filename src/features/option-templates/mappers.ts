import { OptionTemplate as PrismaOptionTemplate } from "../../../prisma/generated/prisma/client"
import { OptionTemplateDTO, OptionValueDTO } from "./dtos"

export function mapOptionTemplate(
  option: PrismaOptionTemplate,
): OptionTemplateDTO {
  return {
    id: option.id,
    name: option.name,
    appType: option.appType,
    inputType: option.inputType,
    uiType: option.uiType,
    pricingStrategy: option.pricingStrategy,
    values: option.values as OptionValueDTO[],
    isActive: option.isActive,
    required: option.required,
    createdAt: option.createdAt,
    updatedAt: option.updatedAt,
  }
}
