// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Définir les routes protégées
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Si la route est protégée, on exige que l'utilisateur soit authentifié
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Ignore les fichiers statiques et les dossiers système
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}