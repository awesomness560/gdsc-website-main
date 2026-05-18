import type { ReactNode } from 'react'

type PageBackgroundProps = {
  children: ReactNode
}

export function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="relative min-h-screen text-fg">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-page-gradient"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-[38%] left-[26%] h-64 w-64 rounded-full bg-google-blue/20 blur-3xl" />
        <div className="absolute top-[40%] right-[24%] h-72 w-72 rounded-full bg-google-yellow/15 blur-3xl" />
        <div className="absolute right-[18%] bottom-[12%] h-64 w-64 rounded-full bg-google-green/12 blur-3xl" />
      </div>

      {children}
    </div>
  )
}
