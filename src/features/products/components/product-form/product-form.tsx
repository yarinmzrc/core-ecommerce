"use client"

import { XCircleIcon } from "lucide-react"
import React, { useMemo, useState } from "react"
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"

import { Image } from "@/components/image"
import { Button } from "@/components/ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form/form"
import { FormFieldWrapper } from "@/components/ui/form/form-field-wrapper"
import { FormInput } from "@/components/ui/form/form-input"
import { FormMultiSelect } from "@/components/ui/form/form-multi-select"
import { FormSelect } from "@/components/ui/form/form-select"
import { FormTextArea } from "@/components/ui/form/form-text-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CategoryDTO } from "@/features/categories/dtos"
import { OptionTemplateForm } from "@/features/option-templates/components/option-template-form"
import { OptionTemplateDTO } from "@/features/option-templates/dtos"

import { ProductFullDTO } from "../../dtos"
import { productSchema, ProductSchemaType } from "../../schemas"

const getDefaultValues = (product?: ProductFullDTO) => {
  if (product) {
    return {
      name: product.name,
      basePrice: product.basePrice,
      description: product.description,
      categoryId: product.categoryId,
      images: {
        new: [],
        existing: product.images,
      },
      options: product.options.map((option) => ({
        label: option.name,
        value: option.templateId,
        overrides: option.overrides,
      })),
    }
  }

  return {
    name: "",
    basePrice: 0,
    description: "",
    categoryId: "",
    images: {
      new: [],
      existing: [],
    },
    options: [],
  }
}

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
  const defaultValues: ProductSchemaType = useMemo(
    () => getDefaultValues(product),
    [product],
  )

  return (
    <Form
      id="product-form"
      schema={productSchema}
      options={{ defaultValues }}
      onSubmit={(formValues) => {
        console.log({ formValues })
      }}
    >
      {({ formState, control }) => (
        <>
          <FormInput
            type="text"
            name="name"
            label="Name"
            control={control}
            error={formState.errors["name"]}
          />

          <FormInput
            type="number"
            name="basePrice"
            control={control}
            label="Price"
            error={formState.errors["basePrice"]}
          />

          <FormSelect
            label="Category"
            control={control}
            name="categoryId"
            error={formState.errors["categoryId"]}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />

          <FormTextArea
            label="Description"
            name="description"
            control={control}
            error={formState.errors["description"]}
          />

          <FormMultiSelect
            name="options"
            label="Options"
            options={optionTemplates.map((option) => ({
              label: option.name,
              value: option.id,
            }))}
            placeholder="Select options"
          />

          <OptionButtons optionTemplates={optionTemplates} />

          {product && <ExistingImagesField />}
          <AddImagesField />

          <div>
            <Button>Save Product</Button>
          </div>
        </>
      )}
    </Form>
  )
}

function ExistingImagesField() {
  const { control } = useFormContext<ProductSchemaType>()
  const { fields, remove } = useFieldArray({
    control,
    name: "images.existing",
  })

  return (
    <FormFieldWrapper label="Existing images">
      {fields.map((field, index) => (
        <div key={field.id} className="relative">
          <Image
            src={field.url}
            alt={`Product image ${index + 1}`}
            width={100}
            height={100}
            className="rounded-md object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-1 right-1 size-6 p-0"
            onClick={() => remove(index)}
          >
            <XCircleIcon />
          </Button>
        </div>
      ))}
    </FormFieldWrapper>
  )
}

function AddImagesField() {
  const { control } = useFormContext<ProductSchemaType>()

  const { append, remove, fields } = useFieldArray({
    control,
    name: "images.new",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      append({
        file,
      })
    })

    e.target.value = ""
  }

  return (
    <FormFieldWrapper label="Images">
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" asChild>
          <Label>
            Add Images
            <Input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </Button>
        <p className="text-muted-foreground text-sm">
          Supported formats: png, jpg, jpeg
        </p>
      </div>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center">
            <span className="text-muted-foreground text-sm">
              {field.file.name}
            </span>
            <Button
              type="button"
              size="sm"
              variant="link"
              onClick={() => remove(index)}
            >
              <XCircleIcon />
            </Button>
          </div>
        ))}
      </div>
    </FormFieldWrapper>
  )
}

type OptionButtonProps = {
  optionTemplates: OptionTemplateDTO[]
}

function OptionButtons({ optionTemplates }: OptionButtonProps) {
  const { control } = useFormContext<ProductSchemaType>()

  const [activeOptionId, setActiveOptionId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const activeOption = optionTemplates.find((o) => o.id === activeOptionId)

  const options = useWatch({
    control,
    name: "options",
  })

  return (
    <div>
      {options.map((option) => (
        <Button
          type="button"
          key={option.value}
          variant="outline"
          onClick={() => {
            setActiveOptionId(option.value)
            setIsModalOpen(true)
          }}
        >
          {option.label}
        </Button>
      ))}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{activeOption?.name}</DialogTitle>
            <DialogDescription>description</DialogDescription>
          </DialogHeader>
          <OptionTemplateForm optionTemplate={activeOption} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
