import { OptionTemplateCreateInput } from "@repo/api-types"

import db from "@/lib/db"

import { Prisma } from "../../../../prisma/generated/prisma/client"

export function createOptionTemplate(dataDTO: OptionTemplateCreateInput) {
  const data = {
    ...dataDTO,
    values: dataDTO.values as Prisma.InputJsonValue,
  }

  return db.optionTemplate.create({ data })
}

export function updateOptionTemplate(
  id: string,
  dataDTO: OptionTemplateCreateInput,
) {
  const data = {
    ...dataDTO,
    values: dataDTO.values as Prisma.InputJsonValue,
  }
  return db.optionTemplate.update({ where: { id }, data })
}

export function deleteOptionTemplate(id: string) {
  return db.optionTemplate.delete({ where: { id } })
}
