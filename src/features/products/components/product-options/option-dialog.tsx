"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  OptionPricingStrategy,
  OptionPricingStrategyType,
  OptionUIType,
} from "@/config/app/option-templates"

const inputTypes = {
  TEXT: "text",
  NUMBER: "number",
} as const

type InputType = (typeof inputTypes)[keyof typeof inputTypes]

type BaseOptionType = {
  title: string
  uiType: OptionUIType
  inputType: InputType
  pricingStrategy: OptionPricingStrategyType
  required?: boolean
}

type NumberOptionType = BaseOptionType & {
  inputType: "number"
  unitPrice?: number
  min?: number
  max?: number
  values: { value: number; label: string; priceDelta?: number }[]
}

type TextOptionType = BaseOptionType & {
  inputType: "text"
  values: { value: string; label: string; priceDelta?: number }[]
}

type OptionType = NumberOptionType | TextOptionType

type StateTypeNormalized = Omit<OptionType, "values"> & {
  inputs: {
    value: string
    label: string
    priceDelta?: number
    id: string
  }[]
}

const initialState: StateTypeNormalized = {
  title: "",
  uiType: OptionUIType.SELECT,
  inputType: inputTypes.TEXT,
  pricingStrategy: OptionPricingStrategy.NONE,
  inputs: [],
}

type OptionDialogProps = {
  title?: string
  option: OptionType
}

export function OptionDialog({ title }: OptionDialogProps) {
  const [state, setState] = useState(initialState)

  const handleChange = (key: string, value: string) => {
    setState((prev) => {
      return { ...prev, [key]: value }
    })
  }

  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? "Add Option"}</DialogTitle>
          <DialogDescription>description</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-80 overflow-hidden">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="title">Option Name</Label>
              <Input
                id="title"
                placeholder="Option name"
                value={state.title}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uiType">Option UI Type</Label>
              <Select
                value={state.uiType}
                onValueChange={(v) => handleChange("uiType", v)}
              >
                <SelectTrigger className="w-full" id="uiType">
                  <SelectValue placeholder="Option UI Type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(OptionUIType).map((uiType) => (
                    <SelectItem key={uiType} value={uiType}>
                      {uiType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricingStrategy">Pricing Strategy</Label>
              <Select
                value={state.pricingStrategy}
                onValueChange={(v) => handleChange("pricingStrategy", v)}
              >
                <SelectTrigger className="w-full" id="pricingStrategy">
                  <SelectValue placeholder="Pricing Strategy" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(OptionPricingStrategy).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {state.uiType !== "BOOLEAN" && (
              <div className="space-y-2">
                <Label htmlFor="inputType">Input Type</Label>
                <Select
                  value={state.inputType}
                  onValueChange={(v) => handleChange("inputType", v)}
                >
                  <SelectTrigger className="w-full" id="inputType">
                    <SelectValue placeholder="Pricing Strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(inputTypes).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {state.inputs.map((input, index) => (
              <div key={input.id} className="col-span-2 flex items-end gap-2">
                <div className="space-y-1">
                  <Label
                    htmlFor={`option-${index + 1}`}
                  >{`Option ${index + 1}`}</Label>
                  <Input
                    id={`option-${index + 1}`}
                    type={state.inputType}
                    value={input.value}
                    onChange={(e) => {
                      const newInputs = state.inputs.map((i) => {
                        if (i.id === input.id) {
                          return { ...i, value: e.target.value }
                        }
                        return i
                      })
                      setState((prev) => ({ ...prev, inputs: newInputs }))
                    }}
                  />
                </div>
                {state.pricingStrategy === OptionPricingStrategy.ADDON && (
                  <div className="space-y-1">
                    <Label
                      htmlFor={`price-delta-${index + 1}`}
                    >{`Price Delta ${index + 1}`}</Label>
                    <Input
                      id={`price-delta-${index + 1}`}
                      placeholder="Price Delta"
                      type={state.inputType}
                      value={input.priceDelta?.toString() ?? ""}
                      onChange={(e) => {
                        const newInputs = state.inputs.map((i) => {
                          if (i.id === input.id) {
                            return {
                              ...i,
                              priceDelta: Number(e.target.value),
                            }
                          }
                          return i
                        })
                        setState((prev) => ({ ...prev, inputs: newInputs }))
                      }}
                    />
                  </div>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      inputs: prev.inputs.filter((i) => i.id !== input.id),
                    }))
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              className="col-span-2"
              onClick={() =>
                setState((prev) => {
                  return {
                    ...prev,
                    inputs: [
                      ...prev.inputs,
                      {
                        id: crypto.randomUUID(),
                        value: "",
                        label: "",
                        priceDelta: 0,
                      },
                    ],
                  }
                })
              }
            >
              Add Input
            </Button>
            <div className="space-y-2">
              <Switch
                id="required"
                checked={state.required}
                onCheckedChange={(required) =>
                  setState((prev) => ({ ...prev, required }))
                }
              />
              <Label htmlFor="required">Required</Label>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => console.log({ state })}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
