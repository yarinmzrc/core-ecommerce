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
        className="relative flex h-[60vh] w-full items-center justify-center bg-cover bg-center pt-20 md:h-[70vh]"
        style={{ backgroundImage: `url(/images/hero.jpg)` }}
      />
      <div className="container mx-auto p-6">{children}</div>
      <footer className="bg-primary">
        <div className="container mx-auto flex items-center justify-between p-6">
          <span className="text-primary-foreground">
            {new Date().getFullYear()} Catering &copy;
          </span>
        </div>
      </footer>
    </>
  )
}
