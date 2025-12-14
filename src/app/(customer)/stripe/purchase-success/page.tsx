import { notFound } from "next/navigation"
import Stripe from "stripe"
import { prisma } from "../../../../../prisma/client"
import Image from "next/image"
import { formatCurrency } from "@/lib/format"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { paths } from "@/config/paths"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function PurchaseSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent: string }>
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    (await searchParams).payment_intent,
  )

  if (paymentIntent.metadata.productId == null) return notFound()

  const product = await prisma.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  })

  if (product == null) return notFound()

  const isSuccess = paymentIntent.status === "succeeded"

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <h1 className="text-2xl font-bold">
        {isSuccess ? "Success!" : "Something went wrong"}
      </h1>
      <div className="flex items-center gap-4">
        <div className="relative aspect-video w-1/3 shrink-0">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">{formatCurrency(product.price)}</div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-muted-foreground line-clamp-3">
            {product.description}
          </div>
          {!isSuccess && (
            <Button asChild className="mt-4" size="lg">
              <Link href={paths.app.products.purchase.getHref(product.id)}>
                Try again
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
