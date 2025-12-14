import { Nav, NavLink } from "@/components/nav"
import { paths } from "@/config/paths"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav>
        <NavLink href={paths.admin.root.getHref()}>Dashboard</NavLink>
        <NavLink href={paths.admin.products.root.getHref()}>Products</NavLink>
        <NavLink href={paths.admin.categories.root.getHref()}>
          Categories
        </NavLink>
        <NavLink href={paths.admin.orders.root.getHref()}>Orders</NavLink>
      </Nav>
      <div className="container mx-auto p-6">{children}</div>
    </>
  )
}
