import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { paths } from "@/config/paths"
import { authOptions } from "@/lib/auth"

import { AdminLoginForm } from "../_components/login-form"
export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions)

  if (session?.user) return redirect(paths.admin.root.getHref())

  return <AdminLoginForm />
}
