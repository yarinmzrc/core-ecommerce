import { AppNav } from "./_components/app-nav"

export const dynamic = "force-dynamic"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AppNav />
      <section
        className="relative mt-12 flex h-[60vh] w-full items-center justify-center bg-cover bg-center md:h-[70vh]"
        style={{ backgroundImage: `url(/images/hero.jpg)` }}
      />
      <div className="container mx-auto p-6">{children}</div>
    </>
  )
}
