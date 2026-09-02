import { createFileRoute, redirect } from '@tanstack/react-router'
import { GDG_CHAPTER_URL } from '#/lib/membership'

export const Route = createFileRoute('/membership')({
  beforeLoad: () => {
    throw redirect({ href: GDG_CHAPTER_URL })
  },
})
