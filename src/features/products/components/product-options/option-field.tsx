"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input"
import {
  OptionUIType,
  SelectOptionTemplate,
} from "@/config/app/option-templates"

export function OptionField({
  option,
}: {
  option: SelectOptionTemplate<"STRING">
}) {
  switch (option.uiType) {
    case OptionUIType.SELECT:
      return (
        <SelectValuesEditor
          option={option}
          values={["SSS"]}
          onChange={(values) => {
            console.log({ values })
          }}
        />
      )
    // case OptionUIType.MULTI_SELECT:
    //   return <div>multi select</div>
    // case OptionUIType.NUMBER:
    //   return <div> number</div>
    // case OptionUIType.BOOLEAN:
    //   return <div>boolean</div>
  }
}

type SelectInput = {
  id: string
  value: string
}

export function SelectValuesEditor({
  option,
  onChange,
}: {
  option: SelectOptionTemplate<"STRING">
  values: string[]
  onChange: (values: string[]) => void
}) {
  const [inputs, setInputs] = useState<SelectInput[]>([])

  return (
    <div>
      <p>{option.label}</p>
      {inputs.map((input) => (
        <div key={input.id} className="flex items-center gap-1">
          <Input
            type="text"
            defaultValue={input.value}
            onChange={(e) => {
              const newInputs = inputs.map((i) => {
                if (i.id === input.id) {
                  return { ...i, value: e.target.value }
                }
                return i
              })
              setInputs(newInputs)
              onChange(newInputs.map((i) => i.value))
            }}
          />
          <Button
            variant="destructive"
            onClick={() => {
              const filtered = inputs.filter((i) => i.id !== input.id)
              setInputs(filtered)
              onChange(filtered.map((i) => i.value))
            }}
          >
            X
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => {
          const newInputs = [...inputs, { id: crypto.randomUUID(), value: "" }]
          setInputs(newInputs)
          onChange(newInputs.map((i) => i.value))
        }}
      >
        Add more
      </Button>
    </div>
  )
}
