import { createFileRoute } from '@tanstack/react-router'

/** Leaf route for /signup — UI lives in the parent pathless `_auth` layout. */
export const Route = createFileRoute('/_auth/signup')({
  pendingComponent: () => null,
  pendingMs: 500,
})
