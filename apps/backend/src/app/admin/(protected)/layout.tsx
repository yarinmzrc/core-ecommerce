import { getCurrentUser } from "@/lib/auth/session"
import { AdminNav } from "../_components/admin-nav"
import { redirect } from "next/navigation"
import { paths } from "@/config/paths"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()

  console.log({ user })

  if (!user) {
    redirect(paths.admin.login.getHref())
  }

  return (
    <>
      <AdminNav />
      <div className="container mx-auto px-4 pt-26">{children}</div>
    </>
  )
}
