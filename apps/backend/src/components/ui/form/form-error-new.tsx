export type FormErrorProps = {
  errorMessage?: string | null
}

export function FormError({ errorMessage }: FormErrorProps) {
  if (!errorMessage) return null
  return (
    <div
      role="alert"
      aria-label={errorMessage}
      className="text-xs text-red-600"
    >
      {errorMessage}
    </div>
  )
}
