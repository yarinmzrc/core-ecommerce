import db from "@/lib/db"

import { mapOptionTemplate } from "../mappers"

export async function getOptionTemplate(id: string) {
  const optionTemplate = await db.optionTemplate.findUnique({ where: { id } })

  if (!optionTemplate) return null

  return mapOptionTemplate(optionTemplate)
}

export async function getOptionTemplates() {
  const optionTemplates = await db.optionTemplate.findMany()

  return optionTemplates.map(mapOptionTemplate)
}
