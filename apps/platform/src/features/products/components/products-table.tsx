"use client"

import { CheckCircle2, MoreVerticalIcon, XCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useTransition } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { paths } from "@/config/paths"
import { formatCurrency, formatNumber } from "@/lib/format"

import { deleteProduct, toggleProductAvailability } from "../dal/mutations"
import { ProductListItemDTO } from "../dtos"

type ProductsTableProps = {
  products: ProductListItemDTO[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const commonT = useTranslations("common")
  const tableT = useTranslations("admin.products.table")

  if (products.length === 0) {
    return <p>{commonT("empty.products")}</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">{tableT("columns.available")}</span>
          </TableHead>
          <TableHead>{tableT("columns.name")}</TableHead>
          <TableHead>{tableT("columns.price")}</TableHead>
          <TableHead>{tableT("columns.category")}</TableHead>
          <TableHead>{tableT("columns.orderCount")}</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">{tableT("columns.actions")}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForSale ? (
                <>
                  <span className="sr-only">{tableT("columns.available")}</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="sr-only">
                    {tableT("columns.notAvailable")}
                  </span>
                  <XCircle className="text-red-800" />
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.basePrice)}</TableCell>
            <TableCell>{product.categoryName}</TableCell>
            <TableCell>{formatNumber(product.orderCount ?? 0)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVerticalIcon />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={paths.admin.products.edit.getHref(product.id)}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownAction
                    id={product.id}
                    isAvailableForSale={product.isAvailableForSale}
                  />
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem
                    id={product.id}
                    disabled={product.orderCount > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

type ActiveToggleDropdownActionProps = {
  id: string
  isAvailableForSale: boolean
}

export function ActiveToggleDropdownAction({
  id,
  isAvailableForSale,
}: ActiveToggleDropdownActionProps) {
  const t = useTranslations("admin.products.actions")

  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForSale)
          router.refresh()
        })
      }}
    >
      {isAvailableForSale ? t("disable") : t("enable")}
    </DropdownMenuItem>
  )
}

type DeleteDropdownItemProps = {
  id: string
  disabled?: boolean
}
export function DeleteDropdownItem({ id, disabled }: DeleteDropdownItemProps) {
  const t = useTranslations("admin.products.actions")

  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id)
          router.refresh()
        })
      }}
    >
      <span className="text-red-500">{t("delete")}</span>
    </DropdownMenuItem>
  )
}
