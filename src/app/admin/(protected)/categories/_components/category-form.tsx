"use client"

import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"

import { Image } from "@/components/image"
import { Button } from "@/components/ui/button/button"
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
  const t = useTranslations("admin.categories.form")

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
  }, [data, router, category, action])

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">{t("name")}</Label>
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
        <Label htmlFor="imageUrl">{t("image")}</Label>
        <Input
          type="file"
          id="imageUrl"
          name="imageUrl"
          required={category == null}
        />
        {category?.imageUrl && (
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={200}
            height={200}
          />
        )}
        {data?.error && "imageUrl" in data.error && (
          <div className="text-red-500">{data.error.imageUrl}</div>
        )}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const t = useTranslations("admin.categories.form")

  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type="submit">
      {pending ? t("submitting") : t("submit")}
    </Button>
  )
}
