import { Control, FieldValues, Path } from "react-hook-form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select"
import { FormField } from "./form"
import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from "./form-field-wrapper"

type Option = {
  label: React.ReactNode
  value: string
}

type FormSelectFieldProps<TFormValues extends FieldValues> =
  FormFieldWrapperPassThroughProps & {
    options: Option[]
    name: Path<TFormValues>
    control: Control<TFormValues>
    className?: string
  }

export function FormSelect<TFormValues extends FieldValues>(
  props: FormSelectFieldProps<TFormValues>,
) {
  const { label, options, control, name, error } = props

  return (
    <FormFieldWrapper label={label} error={error}>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.label?.toString()}
                  value={option.value.toString()}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FormFieldWrapper>
  )
}
