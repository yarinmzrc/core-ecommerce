import AppLayout from "./(customer)/layout"
import ProductsPage from "./(customer)/products/page"

export default function Home({ children }: React.PropsWithChildren) {
  return (
    <AppLayout>
      <ProductsPage />
    </AppLayout>
  )
}
