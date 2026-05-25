type AdminPlaceholderPageProps = {
  title: string
  description: string
}

export function AdminPlaceholderPage({
  title,
  description,
}: AdminPlaceholderPageProps) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-fg sm:text-[28px]">
        {title}
      </h1>
      <p className="mt-2 max-w-xl text-sm text-fg-secondary">{description}</p>
    </div>
  )
}
