"use client"

import { useTranslations } from "next-intl"
import { useFieldArray, useFormContext } from "react-hook-form"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Form } from "@/components/ui/form/form"
import { FormInput } from "@/components/ui/form/form-input"
import { FormSelect } from "@/components/ui/form/form-select"
import { FormTextArea } from "@/components/ui/form/form-text-area"
import { CategoryDTO } from "@/features/categories/dtos"
import { OptionTemplateDTO } from "@/features/option-templates/dtos"

import { CreateProductInput, ProductFullDTO } from "../../dtos"
import { createProductSchema, CreateProductSchemaType } from "../../schemas"

type ProductFormProps = {
  product?: ProductFullDTO
  categories: CategoryDTO[]
  optionTemplates: OptionTemplateDTO[]
}

export function ProductForm({
  product,
  categories,
  optionTemplates,
}: ProductFormProps) {
  const t = useTranslations("admin.products.form")
  const buttonsT = useTranslations("buttons")

  const defaultValues = product
    ? {
        name: product.name,
        basePrice: product.basePrice,
        description: product.description,
        categoryId: product.categoryId,
        options: product.options,
      }
    : {
        name: "",
        basePrice: 0,
        description: "",
        categoryId: "",
        options: [],
      }

  return (
    <Form
      id="product-form"
      schema={createProductSchema}
      onSubmit={(val) => console.log(val)}
      options={{ defaultValues }}
    >
      {({ register, formState }) => {
        return (
          <>
            <FormInput
              type="text"
              label="Name"
              error={formState.errors["name"]}
              registration={register("name")}
            />

            <FormInput
              type="number"
              label="Price"
              error={formState.errors["basePrice"]}
              registration={register("basePrice")}
            />

            <FormSelect
              label="Category"
              error={formState.errors["categoryId"]}
              registration={register("categoryId")}
              options={categories.map((c) => ({ label: c.name, value: c.id }))}
            />

            <FormTextArea
              label="Description"
              error={formState.errors["description"]}
              registration={register("description")}
            />

            <OptionTemplates optionTemplates={optionTemplates} />
          </>
        )
      }}
    </Form>
  )
}

type OptionTemplatesProps = {
  optionTemplates: OptionTemplateDTO[]
}

function OptionTemplates({ optionTemplates }: OptionTemplatesProps) {
  const { control } = useFormContext<CreateProductInput>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  })

  console.log({ optionTemplates })
  console.log({ fields })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Add Options</DropdownMenuTrigger>
      <DropdownMenuContent>
        {optionTemplates.map((optionTemplate) => {
          const index = fields.findIndex(
            (field) => field.templateId === optionTemplate.id,
          )
          const isSelected = index !== -1
          return (
            <DropdownMenuCheckboxItem
              key={optionTemplate.id}
              checked={isSelected}
              onCheckedChange={(checked) => {
                if (checked) {
                  append({ templateId: optionTemplate.id, overrides: null })
                } else {
                  remove(index)
                }
              }}
            >
              {optionTemplate.name}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
