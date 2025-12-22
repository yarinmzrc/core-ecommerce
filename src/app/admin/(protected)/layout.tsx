import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { paths } from "@/config/paths"
import { authOptions } from "@/lib/auth"

import { AdminNav } from "../_components/admin-nav"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(paths.admin.login.getHref())

  return (
    <>
      <AdminNav />
      <div className="container mx-auto pt-26">{children}</div>
    </>
  )
}
