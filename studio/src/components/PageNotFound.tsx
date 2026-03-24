

import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';

export default function PageNotFound() {
   return (
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
         <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
            <h2 className="mb-6 text-5xl font-semibold">Whoops!</h2>
            <h3 className="mb-1.5 text-3xl font-semibold">
               Something went wrong
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
               The page you&apos;re looking for isn&apos;t found, we suggest you
               back to home.
            </p>
            <Button asChild size="lg" className="rounded-lg text-base">
               <Link to="/">Back to home page</Link>
            </Button>
         </div>

         {/* Right Section: Illustration */}
         <div className="relative max-h-screen w-full p-2 max-lg:hidden">
            <div className="h-full w-full rounded-2xl bg-black"></div>
            <img
               src="https://images.unsplash.com/vector-1743529921186-e8a5ae51d845?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
               alt="404 illustration"
               className=""
            />
         </div>
      </div>
   );
}
