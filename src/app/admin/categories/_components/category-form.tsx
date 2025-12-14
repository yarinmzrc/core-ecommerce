"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { createCategory } from "@/features/categories/actions/create-category"

export function CategoryForm() {
  const [error, action] = useActionState(createCategory, {})

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
        {error?.name && <div className="text-red-500">{error.name}</div>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Saving..." : "Submit"}
    </Button>
  )
}
