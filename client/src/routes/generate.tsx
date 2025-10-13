import { createFileRoute } from '@tanstack/react-router'
import { StoryGenerator } from '@/components/custom/StoryGenerator'

export const Route = createFileRoute('/generate')({
  component: Generate,
})

function Generate() {
  return (
    <div className="p-2">
      <StoryGenerator />
    </div>
  )
}
