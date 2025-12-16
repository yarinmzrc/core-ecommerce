import { BaseGrid } from "@/components/base-grid"
import { CategoryCard } from "@/features/categories/components/category-card"
import { getCategory } from "@/features/categories/server/get-category"
import { notFound } from "next/navigation"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const category = await getCategory(id)

  if (!category) return notFound()

  return (
    <>
      <h3 className="mb-4 text-3xl font-bold">{category.name}</h3>
      <BaseGrid>
        {category.products.length === 0 ? (
          <div className="text-muted-foreground">No products found</div>
        ) : (
          category.products.map((product) => (
            <CategoryCard key={product.id} category={product} />
          ))
        )}
      </BaseGrid>
    </>
  )
}
