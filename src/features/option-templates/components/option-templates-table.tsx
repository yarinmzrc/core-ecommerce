"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { OptionTemplateDTO } from "../dtos"

type OptionTemplatesTableProps = {
  options: OptionTemplateDTO[]
}

export function OptionTemplatesTable({ options }: OptionTemplatesTableProps) {
  if (options.length === 0) {
    return <p>No options found</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>App Type</TableHead>
          <TableHead>UI Type</TableHead>
          <TableHead>Input Type</TableHead>
          <TableHead>Pricing Strategy</TableHead>
          <TableHead>Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {options.map((option) => (
          <TableRow key={option.id}>
            <TableCell>{option.name}</TableCell>
            <TableCell>{option.appType}</TableCell>
            <TableCell>{option.uiType}</TableCell>
            <TableCell>{option.inputType}</TableCell>
            <TableCell>{option.pricingStrategy}</TableCell>
            <TableCell>{option.isActive ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
