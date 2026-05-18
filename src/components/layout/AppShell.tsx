import { useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { HackPageBackground } from '#/components/layout/HackPageBackground'
import { PageBackground } from '#/components/layout/PageBackground'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isHackRoute = pathname === '/hackdsc' || pathname.startsWith('/hackdsc/')

  if (isHackRoute) {
    return <HackPageBackground>{children}</HackPageBackground>
  }

  return <PageBackground>{children}</PageBackground>
}
