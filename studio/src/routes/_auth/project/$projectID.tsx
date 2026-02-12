import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/project/$projectID')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/project/$projectID"!</div>
}
