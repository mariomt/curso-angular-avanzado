import { RenderMode, ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  {
    path: 'locations', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Client,
  },
  {
    path: 'about', // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server,
  },
];
