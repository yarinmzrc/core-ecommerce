import { UseFormRegisterReturn } from "react-hook-form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select"
import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from "./form-field-wrapper"

type Option = {
  label: React.ReactNode
  value: string
}

type FormSelectFieldPtops = FormFieldWrapperPassThroughProps & {
  options: Option[]
  className?: string
  defaultValue?: string
  registration: Partial<UseFormRegisterReturn>
}

export const FormSelect = (props: FormSelectFieldPtops) => {
  const { label, options, className, defaultValue, registration, error } = props
  return (
    <FormFieldWrapper label={label} error={error}>
      <Select defaultValue={defaultValue} {...registration}>
        <SelectTrigger className="w-45">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={className}>
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
    </FormFieldWrapper>
  )
}
