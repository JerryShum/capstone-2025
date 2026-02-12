import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import './index.css';

import PageNotFound from './components/PageNotFound';

// Set up a Router instance
const router = createRouter({
   routeTree,
   defaultPreload: 'intent',
   scrollRestoration: true,
   defaultNotFoundComponent: PageNotFound,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
   interface Register {
      router: typeof router;
   }
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
   const root = ReactDOM.createRoot(rootElement);
   root.render(<RouterProvider router={router} />);
}
