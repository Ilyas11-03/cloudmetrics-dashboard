const { app } = require('@azure/functions');
const { PrismaClient } = require('@prisma/client');

// Initialisation de Prisma
const prisma = new PrismaClient();

async function CollectMetrics(myTimer, context) {
  context.log('🚀 Début de la collecte des métriques Azure...');
  
  // Affiche la dernière exécution (si disponible)
  if (myTimer.scheduleStatus) {
    context.log(`⏰ Dernière exécution: ${myTimer.scheduleStatus.last}`);
    context.log(`⏰ Prochaine exécution: ${myTimer.scheduleStatus.next}`);
  }

  try {
    // 1. Récupérer ou créer le serveur "Azure-Cloud-Server"
    let server = await prisma.server.findFirst({ where: { name: "Azure-Cloud-Server" } });
    
    if (!server) {
      server = await prisma.server.create({
        data: { 
          name: "Azure-Cloud-Server", 
          ip_address: "10.0.0.1", 
          status: "active" 
        }
      });
      context.log('✅ Serveur Azure créé dans la base de données.');
    }

    // 2. Générer des métriques (Simulation car le script tourne sur les serveurs Azure)
    const cpu = Math.random() * 100; 
    const ram = 30 + (Math.random() * 60); // Entre 30% et 90%
    const disk = Math.random() * 500;

    // 3. Enregistrer dans la base de données Azure MySQL
    await prisma.metric.create({
      data: {
        server_id: server.id,
        cpu_usage: parseFloat(cpu.toFixed(2)),
        ram_usage: parseFloat(ram.toFixed(2)),
        disk_io: parseFloat(disk.toFixed(2))
      }
    });

    context.log(`✅ Succès ! CPU: ${cpu.toFixed(1)}% | RAM: ${ram.toFixed(1)}%`);

  } catch (error) {
    context.error('❌ Erreur lors de la collecte:', error);
  } finally {
    // Toujours déconnecter Prisma à la fin
    await prisma.$disconnect();
  }
}

// Configuration du Timer (Se déclenche toutes les 5 minutes)
app.timer('CollectMetrics', {
  schedule: '0 */5 * * * *', 
  handler: CollectMetrics,
});