import { notFound } from "next/navigation"
import { Stripe } from "stripe"
import { CheckoutForm } from "./_components/checkout-form"
import { env } from "@/config/env"
import { getProduct } from "@/features/products/server/get-product"

const stripe = new Stripe(env.STRIPE_SECRET_KEY)

export default async function PurchasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)

  if (product == null) return notFound()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price,
    currency: "USD",
    metadata: { productId: product.id },
  })

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe Could not create payment intent")
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  )
}
