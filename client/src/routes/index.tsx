import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
   component: Index,
});

function Index() {
   return (
      <div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
         index
      </div>
   );
}

export default Index;
