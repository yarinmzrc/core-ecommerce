import Link from "next/link"

import { Button } from "@/components/ui/button/button"
import { paths } from "@/config/paths"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-2">
      <h1 className="text-2xl font-bold">Purchase successful</h1>
      <Button asChild>
        <Link href={paths.app.root.getHref()}>Go Home</Link>
      </Button>
    </div>
  )
}
