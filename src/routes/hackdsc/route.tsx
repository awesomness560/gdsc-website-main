import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/hackdsc')({
  // Hidden for launch. Remove this `beforeLoad` to bring the HackDSC pages back —
  // the child routes (index, register, schedule) are left intact.
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
  component: HackdscLayout,
})

function HackdscLayout() {
  return <Outlet />
}
