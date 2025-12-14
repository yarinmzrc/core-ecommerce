import { prisma } from "./client"

async function main() {
  // Clean up existsing data
  // await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Create categories
  const categoriesData = [
    { name: "Appetizers" },
    { name: "Main Courses" },
    { name: "Desserts" },
    { name: "Drinks" },
    { name: "Salads" },
  ]

  const categories = []

  for (const cat of categoriesData) {
    const category = await prisma.category.create({ data: cat })
    categories.push(category)
  }

  const [appetizers, mainCourses, desserts] = categories

  // Create products
  const productsData = [
    {
      name: "Cheeseburger",
      price: 5.99,
      description: "A Cheeseburger",
      categoryId: mainCourses.id,
      imagePath: "/products/cheeseburger.jpg",
    },
    {
      name: "Hamburger",
      price: 5.99,
      description: "A Hamburger",
      categoryId: mainCourses.id,
      imagePath: "/products/hamburger.jpg",
    },
    {
      name: "French Fries",
      price: 2.99,
      description: "French Fries",
      categoryId: appetizers.id,
      imagePath: "/products/french-fries.jpg",
    },
    {
      name: "Onion Rings",
      price: 3.99,
      description: "Onion Rings",
      categoryId: appetizers.id,
      imagePath: "/products/onion-rings.jpg",
    },
    {
      name: "Ice Cream",
      price: 3.99,
      description: "Ice Cream",
      categoryId: desserts.id,
      imagePath: "/products/ice-cream.jpg",
    },
  ]

  for (const product of productsData) {
    await prisma.product.create({ data: product })
  }

  console.log("Data has been seeded")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
