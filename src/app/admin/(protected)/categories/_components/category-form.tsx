"use client"

import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"

import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { paths } from "@/config/paths"
import { createCategoryAction } from "@/features/categories/actions/create-category"
import { updateCategoryAction } from "@/features/categories/actions/update-category"
import { CategoryDTO } from "@/features/categories/dtos"

type CategoryFormProps = {
  category?: CategoryDTO
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [data, action] = useActionState(
    category == null
      ? createCategoryAction
      : updateCategoryAction.bind(null, category.id),
    null,
  )

  useEffect(() => {
    if (data?.success) {
      router.push(paths.admin.categories.root.getHref())
    }
    if (data?.error && "_form" in data.error) {
      toast.error(data.error._form)
    }
  }, [data, router, category, action, toast])

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={category?.name ?? ""}
          required
        />
        {data?.error && "name" in data.error && (
          <div className="text-red-500">{data.error.name}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="imagePath">Image</Label>
        <Input
          type="file"
          id="imagePath"
          name="imagePath"
          required={category == null}
        />
        {category?.imagePath && (
          <Image
            src={category.imagePath}
            alt={category.name}
            width={200}
            height={200}
          />
        )}
        {data?.error && "imagePath" in data.error && (
          <div className="text-red-500">{data.error.imagePath}</div>
        )}
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
