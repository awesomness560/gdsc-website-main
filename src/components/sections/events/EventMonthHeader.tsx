type EventMonthHeaderProps = {
  label: string
}

export function EventMonthHeader({ label }: EventMonthHeaderProps) {
  return (
    <h3 className="pb-2 text-sm font-medium tracking-wide text-fg-muted">{label}</h3>
  )
}
