# Catering App

This is a Next.js application that allows users to browse and purchase catering products. The application is built with Next.js, TypeScript, Prisma, and Cloudinary for image storage.

## Getting Started

### Prerequisites

- Docker
- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yarinmzrc/catering-app.git
   ```

2. **Start the Database**

   Start the local MongoDB instance using Docker compose:

   ```bash
   docker compose up -d
   ```

3. **Setup Prisma**

   Generate the prisma client and push the schema to the database:

   ```bash
   npm run db:init
   npx prisma generate
   npx prisma db push
   ```

4. **Seed the Database**

   Populate the database with initial data:

   ```bash
   npm run seed
   ```

5. **Run the Application**

   Start the development server:

   ```bash
   npm run dev
   ```

6. **Visit the App**

   Open [http://localhost:3000](http://localhost:3000)
   in your browser.
