import { AdminNav } from "../_components/admin-nav"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AdminNav />
      <div className="container mx-auto px-4 pt-26">{children}</div>
    </>
  )
}
