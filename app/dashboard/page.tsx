// app/dashboard/page.tsx
import { prisma } from '@/lib/prisma';
import MetricsChart from '@/components/MetricsChart';
import Link from 'next/link';
import { Metric } from '@prisma/client';

// 🚀 AJOUT CRUCIAL : Empêche Next.js de pré-générer cette page au moment du build Docker
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const metrics: Metric[] = await prisma.metric.findMany({
    orderBy: { timestamp: 'desc' },
    take: 20,
  });

  const avgCpu = metrics.length > 0 
    ? (metrics.reduce((acc, curr) => acc + curr.cpu_usage, 0) / metrics.length).toFixed(1) 
    : '0';
    
  const avgRam = metrics.length > 0 
    ? (metrics.reduce((acc, curr) => acc + curr.ram_usage, 0) / metrics.length).toFixed(1) 
    : '0';

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">☁️</span>
              <span className="font-bold text-xl text-blue-400">CloudMetrics</span>
            </div>
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
          <p className="text-gray-400 mt-2">Suivi en temps réel des performances serveurs (Next.js + Azure MySQL)</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm uppercase font-semibold">CPU Moyen</h3>
            <p className="text-4xl font-bold mt-2 text-green-400">{avgCpu}%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm uppercase font-semibold">RAM Moyenne</h3>
            <p className="text-4xl font-bold mt-2 text-yellow-400">{avgRam}%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm uppercase font-semibold">Serveurs Actifs</h3>
            <p className="text-4xl font-bold mt-2 text-blue-400">1</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Historique des performances (Dernières 20 mesures)</h2>
          <MetricsChart data={metrics} />
        </div>
      </div>
    </main>
  );
}