import { ImageRepository } from "@/lib/image"

import { ProductRepository } from "../repositories/product-repository"

export class ProductService {
  constructor(
    private readonly productRepository = new ProductRepository(),
    private readonly imageRepository = new ImageRepository(),
  ) {}

  async getProduct(id: string) {
    return this.productRepository.getProduct(id)
  }

  async createProduct(data: {
    name: string
    price: number
    description: string
    imagePath: File
    categoryId: string
  }) {
    let imageResult = null

    if (data.imagePath && data.imagePath.size > 0) {
      try {
        const uploadResult = await this.imageRepository.upload(
          data.imagePath,
          "products",
        )
        imageResult = uploadResult
      } catch {
        console.error("Error uploading image to Cloudinary")
        throw new Error("Error uploading image to Cloudinary")
      }
    }

    return this.productRepository.create({
      name: data.name,
      price: data.price,
      description: data.description,
      imagePath: imageResult!.secure_url,
      imagePublicId: imageResult!.public_id,
      categoryId: data.categoryId,
    })
  }

  async updateProduct(
    id: string,
    data: {
      name: string
      price: number
      description: string
      imagePath?: File
      categoryId: string
    },
  ) {
    const product = await this.productRepository.getProduct(id)
    if (!product) throw new Error("Not found")

    let imageResult = null
    if (data.imagePath != null && data.imagePath.size > 0) {
      await this.imageRepository.delete(product.imagePublicId)

      try {
        const uploadResult = await this.imageRepository.upload(
          data.imagePath,
          "products",
        )
        imageResult = uploadResult
      } catch {
        console.error("Error uploading image to Cloudinary")
        throw new Error("Error uploading image to Cloudinary")
      }

      return this.productRepository.update(product.id, {
        name: data.name,
        price: data.price,
        description: data.description,
        imagePath: imageResult!.secure_url,
        imagePublicId: imageResult!.public_id,
        categoryId: data.categoryId,
      })
    }
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.getProduct(id)
    if (!product) throw new Error("Not found")

    await this.imageRepository.delete(product.imagePublicId)

    return this.productRepository.delete(id)
  }

  async getMostPopularProducts() {
    return this.productRepository.getMostPopularProducts()
  }

  async getNewestProducts() {
    return this.productRepository.getNewestProducts()
  }

  async getProductsForStore() {
    return this.productRepository.getProductsForStore()
  }

  async getProductsForAdmin() {
    return this.productRepository.getProductsForAdmin()
  }

  async toggleProductAvailability(id: string, isAvailableForSale: boolean) {
    return this.productRepository.toggleProductAvailability(
      id,
      isAvailableForSale,
    )
  }
}
