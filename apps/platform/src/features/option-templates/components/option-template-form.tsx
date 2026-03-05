import { useMemo } from "react"
import { Control, FormState, useFieldArray, useWatch } from "react-hook-form"

import { Button } from "@/components/ui/button/button"
import { Form } from "@/components/ui/form/form"
import { FormInput } from "@/components/ui/form/form-input"
import { FormSelect } from "@/components/ui/form/form-select"

import { OptionInput, OptionPricingStrategy, OptionUI } from "../dtos"
import { optionTemplateSchema } from "../schemas"
import {
  AppType,
  OptionTemplate,
  OptionTemplateCreateInput,
} from "@repo/api-types"

type OptionTemplateFormProps = {
  optionTemplate?: OptionTemplate
}

const getDefaultValues = (optionTemplate?: OptionTemplate) => {
  return {
    name: optionTemplate?.name ?? "",
    inputType: optionTemplate?.inputType ?? OptionInput.TEXT,
    uiType: optionTemplate?.uiType ?? OptionUI.SELECT,
    pricingStrategy:
      optionTemplate?.pricingStrategy ?? OptionPricingStrategy.NONE,
    values: optionTemplate?.values ?? [],
    appType: optionTemplate?.appType ?? AppType.FOOD,
  }
}

export function OptionTemplateForm({
  optionTemplate,
}: OptionTemplateFormProps) {
  const defaultValues: OptionTemplateCreateInput = useMemo(
    () => getDefaultValues(optionTemplate),
    [optionTemplate],
  )

  return (
    <Form
      id="option-template-form"
      schema={optionTemplateSchema}
      options={{ defaultValues }}
      onSubmit={(formValues) => {
        console.log({ formValues })
      }}
    >
      {({ formState, control }) => (
        <>
          <OptionTemplateField formState={formState} control={control} />
          <Button>Submit</Button>
        </>
      )}
    </Form>
  )
}

const defaultInputValue = {
  label: "",
  value: "",
  priceDelta: 0,
}

type OptionTemplatesFieldProps = {
  formState: FormState<OptionTemplateCreateInput>
  control: Control<OptionTemplateCreateInput>
}

export function OptionTemplateField({
  control,
  formState,
}: OptionTemplatesFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "values",
  })

  console.log({ formState })

  const pricingStrategyWatch = useWatch({
    control,
    name: "pricingStrategy",
  })

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <FormInput
          label="Name"
          name="name"
          control={control}
          error={formState.errors["name"]}
        />
      </div>

      <FormSelect
        label="UI type"
        name="uiType"
        control={control}
        options={Object.values(OptionUI).map((uiType) => ({
          label: uiType,
          value: uiType,
        }))}
      />

      <FormSelect
        label="Pricing strategy"
        name="pricingStrategy"
        control={control}
        options={Object.values(OptionPricingStrategy).map(
          (pricingStrategy) => ({
            label: pricingStrategy,
            value: pricingStrategy,
          }),
        )}
      />

      <FormSelect
        label="Input type"
        control={control}
        name="inputType"
        options={Object.values(OptionInput).map((inputType) => ({
          label: inputType,
          value: inputType,
        }))}
      />

      <div className="col-span-2 space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-2">
            <FormInput
              label={`Option Label ${index + 1}`}
              name={`values.${index}.label`}
              control={control}
              error={formState.errors["values"]?.[index]?.label}
            />

            <FormInput
              label={`Option Value ${index + 1}`}
              name={`values.${index}.value`}
              control={control}
              error={formState.errors["values"]?.[index]?.value}
            />

            {pricingStrategyWatch === OptionPricingStrategy.ADDON && (
              <FormInput
                label={`Price Delta ${index + 1}`}
                type="number"
                name={`values.${index}.priceDelta`}
                control={control}
                error={formState.errors["values"]?.[index]?.priceDelta}
              />
            )}

            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => append(defaultInputValue)}>
          Add Input
        </Button>
      </div>
    </div>
  )
}
