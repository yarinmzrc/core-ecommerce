import db from "@/lib/db"

export function getOptionTemplate(id: string) {
  return db.optionTemplate.findUnique({ where: { id } })
}

export function getOptionTemplates() {
  return db.optionTemplate.findMany()
}
