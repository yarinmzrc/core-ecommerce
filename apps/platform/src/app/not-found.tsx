import Link from "next/link"

import { Button } from "@/components/ui/button/button"
import { paths } from "@/config/paths"

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <h2>Page Not Found</h2>
      <p className="text-muted-foreground">Could not find requested resource</p>
      <Button asChild>
        <Link href={paths.app.root.getHref()}>Go Home</Link>
      </Button>
    </div>
  )
}
