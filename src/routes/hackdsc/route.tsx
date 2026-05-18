import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hackdsc')({
  component: HackdscLayout,
})

function HackdscLayout() {
  return <Outlet />
}
