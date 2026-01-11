import { getTranslations } from "next-intl/server"

import { Pagination } from "@/components/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/format"
import { PaginatedResult } from "@/types/pagination"

import { getOrders } from "../dal/queries"
import { OrderDTO, OrderStatus } from "../dtos"

export async function OrdersTable({ page = 1 }: { page: number }) {
  const ordersT = await getTranslations("admin.orders.table")
  const commonT = await getTranslations("common")

  const { data: orders, metadata }: PaginatedResult<OrderDTO> = await getOrders(
    {
      page,
      pageSize: 10,
    },
  )

  if (orders == null || orders.length === 0) {
    return <p>{commonT("empty.orders")}</p>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{ordersT("columns.email")}</TableHead>
            <TableHead>{ordersT("columns.createdAt")}</TableHead>
            <TableHead>{ordersT("columns.price")}</TableHead>
            <TableHead>{ordersT("columns.status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.guestEmail}</TableCell>
              <TableCell>{order.createdAt.toString()}</TableCell>
              <TableCell>{formatCurrency(order.total)}</TableCell>
              <TableCell>
                <Select defaultValue={order.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(OrderStatus).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination metadata={metadata} activePage={page} />
    </>
  )
}

export async function OrdersTableSkeleton() {
  const ordersT = await getTranslations("admin.orders.table")

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{ordersT("columns.email")}</TableHead>
          <TableHead>{ordersT("columns.createdAt")}</TableHead>
          <TableHead>{ordersT("columns.price")}</TableHead>
          <TableHead>{ordersT("columns.status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 4 }).map((_, index) => (
          <TableRow key={index}>
            {Array.from({ length: 4 }).map((_, index) => (
              <TableCell key={index}>
                <div className="h-4 animate-pulse rounded-full bg-gray-300"></div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
