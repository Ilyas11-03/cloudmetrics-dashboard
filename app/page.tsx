import Link from 'next/link';
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
    
<div className="flex items-center gap-3">
  <Show when="signed-out">
    <SignInButton mode="modal">
      <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
        Se connecter
      </button>
    </SignInButton>
    <SignUpButton mode="modal">
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
        S'inscrire
      </button>
    </SignUpButton>
  </Show>
  <Show when="signed-in">
    <Link
      href="/dashboard"
      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      Tableau de bord
    </Link>
    <UserButton />
  </Show>
</div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Projet Portfolio - Master Big Data & Cloud Computing
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Surveillance d'Infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              en Temps Réel
            </span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
            Une plateforme SaaS moderne pour visualiser les métriques de vos serveurs (CPU, RAM, I/O). 
            Construite avec une architecture Full Stack robuste et scalable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              Accéder au Dashboard en direct →
            </Link>
            <a 
              href="https://github.com/Ilyas11-03" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all border border-gray-700"
            >
              Voir le code sur GitHub
            </a>
          </div>
        </div>
        
        {/* Effet de fond décoratif */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Stack Technique & Fonctionnalités</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4 text-2xl">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Temps Réel</h3>
              <p className="text-gray-400">Ingestion continue de métriques et visualisation instantanée via des graphiques interactifs (Recharts).</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mb-4 text-2xl">🐳</div>
              <h3 className="text-xl font-semibold mb-2">Architecture Docker</h3>
              <p className="text-gray-400">Base de données MySQL conteneurisée pour un environnement de développement reproductible et isolé.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-4 text-2xl">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Type-Safe & Moderne</h3>
              <p className="text-gray-400">Développé avec Next.js App Router, TypeScript et Prisma ORM pour une robustesse maximale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-950 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© 2026 CloudMetrics. Développé par Ilyas Aboulkassim.</p>
      </footer>
    </main>
  )}