import db from "@/lib/db"

export async function getCategory(id: string) {
  return db.category.findUnique({
    where: { id },
    include: { products: true },
  })
}

export async function getCategories() {
  return db.category.findMany({
    orderBy: {
      name: "asc",
    },
  })
}
