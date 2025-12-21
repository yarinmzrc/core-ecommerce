import db from "@/lib/db"

export async function createCategory(name: string) {
  return db.category.create({
    data: {
      name,
    },
  })
}
