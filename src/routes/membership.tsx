import { createFileRoute, redirect } from '@tanstack/react-router'
import { JOIN_PAGE_PATH } from '#/lib/membership'

export const Route = createFileRoute('/membership')({
  beforeLoad: () => {
    throw redirect({ to: JOIN_PAGE_PATH })
  },
})
