"use client"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"

import { Button } from "@/components/ui/button/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { paths } from "@/config/paths"

export function AdminLoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await signIn("credentials", {
        email,
        password,
      })

      if (response?.error) {
        console.error("Login error:", response.error)
      } else {
        router.push(paths.admin.root.getHref())
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Card className="w-120">
      <CardHeader>
        <CardTitle>
          <h1 className="text-4xl font-bold">Admin Login</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} method="post" className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
