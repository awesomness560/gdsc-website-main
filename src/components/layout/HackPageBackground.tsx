import type { ReactNode } from 'react'

type HackPageBackgroundProps = {
  children: ReactNode
}

export function HackPageBackground({ children }: HackPageBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-hack-page-gradient text-fg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 min-h-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-hack-grid-pattern opacity-50" />
        <div className="absolute -top-20 left-[8%] h-80 w-80 rounded-full bg-google-blue/20 blur-3xl" />
        <div className="absolute top-[12%] right-[5%] h-72 w-72 rounded-full bg-google-yellow/15 blur-3xl" />
        <div className="absolute top-[35%] left-[2%] h-64 w-64 rounded-full bg-violet-500/12 blur-3xl" />
        <div className="absolute right-[15%] bottom-[8%] h-64 w-64 rounded-full bg-google-green/12 blur-3xl" />
        <div className="absolute top-[20%] left-[40%] h-56 w-56 rounded-full bg-google-red/10 blur-3xl" />
      </div>

      <div className="relative">{children}</div>
    </div>
  )
}
