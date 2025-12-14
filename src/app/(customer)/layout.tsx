import { Nav, NavLink } from "@/components/nav"
import { paths } from "@/config/paths"

export const dynamic = "force-dynamic"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav>
        <NavLink href={paths.app.root.getHref()}>Home</NavLink>
        <NavLink href={paths.app.products.root.getHref()}>Products</NavLink>
        <NavLink href={paths.app.orders.root.getHref()}>My Orders</NavLink>
      </Nav>
      <div className="container mx-auto p-6">{children}</div>
    </>
  )
}
