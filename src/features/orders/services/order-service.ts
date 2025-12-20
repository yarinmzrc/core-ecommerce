import { ProductService } from "@/features/products/services/product-service"

import { OrderRepository } from "../repositories/order-repository"

export class OrderService {
  constructor(
    private readonly orderRepository = new OrderRepository(),
    private readonly productService = new ProductService(),
  ) {}

  async getOrders() {
    return this.orderRepository.getOrders()
  }

  async getOrder(id: string) {
    return this.orderRepository.getOrder(id)
  }

  async createOrder(dto: {
    guestEmail: string
    guestName?: string
    guestPhone?: string
    items: { productId: string; quantity: number }[]
  }) {
    const products = await this.productService.getProductsByIds(
      dto.items.map((i) => i.productId),
    )

    if (products.length !== dto.items.length) {
      throw new Error("Product not found")
    }

    const orderItems = dto.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!
      return {
        productId: product.id,
        price: product.price,
        quantity: item.quantity,
      }
    })

    const pricePaid = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )

    return this.orderRepository.createOrder({
      pricePaid,
      orderItems,
      guestEmail: dto.guestEmail,
      guestName: dto.guestName,
      guestPhone: dto.guestPhone,
    })
  }
}
