import { redirect } from "next/navigation"

import { paths } from "@/config/paths"

import { AdminLoginForm } from "../_components/login-form"
import { getCurrentUser } from "@/lib/auth/session"

export default async function AdminLoginPage() {
  const user = await getCurrentUser()

  if (user) return redirect(paths.admin.root.getHref())

  return <AdminLoginForm />
}
