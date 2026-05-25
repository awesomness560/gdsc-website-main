import { createFileRoute } from '@tanstack/react-router'

/** Leaf route for /login — UI lives in the parent pathless `_auth` layout. */
export const Route = createFileRoute('/_auth/login')({
  pendingComponent: () => null,
  pendingMs: 500,
})
