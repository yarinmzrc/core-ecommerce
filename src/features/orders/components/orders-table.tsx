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
  const { data: orders, metadata }: PaginatedResult<OrderDTO> = await getOrders(
    {
      page,
      pageSize: 10,
    },
  )

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email Of Customer</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
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
                    {Object.keys(OrderStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
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

export function OrdersTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email Of Customer</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
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
