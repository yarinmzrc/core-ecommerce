"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <p>We apologize for the inconvenience. Please try again</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
