import { useMemo } from "react"
import { FieldValues, Path, useFormContext } from "react-hook-form"

import { Form } from "@/components/ui/form/form"
import { FormInput } from "@/components/ui/form/form-input"
import { FormSelect } from "@/components/ui/form/form-select"

import {
  OptionInput,
  OptionPricingStrategy,
  OptionTemplateDTO,
  OptionUI,
} from "../dtos"
import {
  CreateOptionTemplateSchema,
  createOptionTemplateSchema,
  updateOptionTemplateSchema,
} from "../schemas"

type OptionTemplatesFormProps = {
  optionTemplate?: OptionTemplateDTO
}

export function OptionTemplatesForm({
  optionTemplate,
}: OptionTemplatesFormProps) {
  const defaultValues: CreateOptionTemplateSchema = useMemo(
    () =>
      optionTemplate
        ? {
            name: optionTemplate.name,
            inputType: optionTemplate.inputType,
            uiType: optionTemplate.uiType,
            pricingStrategy: optionTemplate.pricingStrategy,
            values: optionTemplate.values,
            isActive: optionTemplate.isActive,
            required: optionTemplate.required,
          }
        : {
            name: "",
            values: [],
            inputType: OptionInput.TEXT,
            uiType: OptionUI.SELECT,
            pricingStrategy: OptionPricingStrategy.NONE,
            isActive: true,
            required: false,
          },
    [optionTemplate],
  )

  const schema = optionTemplate
    ? createOptionTemplateSchema
    : updateOptionTemplateSchema

  return (
    <Form
      id="option-template-form"
      schema={schema}
      options={{ defaultValues }}
      onSubmit={(formValues) => {
        console.log({ formValues })
      }}
    >
      {() => <OptionTemplatesField baseName="" defaultValues={defaultValues} />}
    </Form>
  )
}

function fieldPath<T extends FieldValues>(base: Path<T>, field: string) {
  return `${base}.${field}` as Path<T>
}

type OptionTemplatesFieldProps<TFormValues extends FieldValues> = {
  defaultValues: CreateOptionTemplateSchema
  baseName: Path<TFormValues>
}

export function OptionTemplatesField<TFormValues extends FieldValues>({
  defaultValues,
  baseName,
}: OptionTemplatesFieldProps<TFormValues>) {
  const { control } = useFormContext<TFormValues>()

  return (
    <>
      <FormInput
        label="Name"
        name={fieldPath(baseName, "name")}
        control={control}
      />

      <FormSelect
        label="Input type"
        control={control}
        name={fieldPath(baseName, "inputType")}
        options={Object.values(OptionInput).map((inputType) => ({
          label: inputType,
          value: inputType,
        }))}
      />

      <FormSelect
        label="UI type"
        name={fieldPath(baseName, "uiType")}
        control={control}
        options={Object.values(OptionUI).map((uiType) => ({
          label: uiType,
          value: uiType,
        }))}
      />

      <FormSelect
        label="Pricing strategy"
        name={fieldPath(baseName, "pricingStrategy")}
        control={control}
        options={Object.values(OptionPricingStrategy).map(
          (pricingStrategy) => ({
            label: pricingStrategy,
            value: pricingStrategy,
          }),
        )}
      />
    </>
  )
}
