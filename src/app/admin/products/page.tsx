import { Button } from "@/components/ui/button"
import { PageHeader } from "../_components/page-header"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { prisma } from "../../../../prisma/client"
import { OrderItem, Product } from "../../../../prisma/generated/prisma/client"
import { formatCurrency, formatNumber } from "@/lib/format"
import { CheckCircle2, MoreVerticalIcon, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ActiveToggleDropdownAction,
  DeleteDropdownItem,
} from "./_components/product-actions"
import { paths } from "@/config/paths"

export async function getProducts() {
  return await prisma.product.findMany({
    include: {
      category: { select: { name: true } },
      orderItems: true,
    },
  })
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href={paths.admin.products.new.getHref()}>Add Product</Link>
        </Button>
      </div>
      <ProductsTable products={products} />
    </>
  )
}

type ProductsTableProps = {
  products: (Product & {
    category: { name: string }
    orderItems: OrderItem[]
  })[]
}

function ProductsTable({ products }: ProductsTableProps) {
  if (products.length === 0) {
    return <p>No products found.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available for purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Order Items</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForSale ? (
                <>
                  <span className="sr-only">Available for purchase</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="sr-only">Not available for purchase</span>
                  <XCircle className="text-red-800" />
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>{formatNumber(product.orderItems.length)}</TableCell>
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
                    disabled={product.orderItems.length > 0}
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
