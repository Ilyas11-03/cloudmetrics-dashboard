import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Début de la simulation des métriques...");
  
  // 1. Créer un serveur de test s'il n'existe pas
  let server = await prisma.server.findFirst({ where: { name: "Serveur-Test-01" } });
  if (!server) {
    server = await prisma.server.create({
      data: {
        name: "Serveur-Test-01",
        ip_address: "192.168.1.100",
        status: "active"
      }
    });
    console.log(`✅ Serveur créé : ${server.name}`);
  }

  // 2. Boucle de simulation (toutes les 3 secondes)
  setInterval(async () => {
    const cpu = Math.random() * 100;
    const ram = 30 + (Math.random() * 50); // Entre 30% et 80%
    const disk = Math.random() * 500;

    await prisma.metric.create({
      data: {
        server_id: server.id,
        cpu_usage: parseFloat(cpu.toFixed(2)),
        ram_usage: parseFloat(ram.toFixed(2)),
        disk_io: parseFloat(disk.toFixed(2))
      }
    });
    
    console.log(`📊 Métriques ajoutées - CPU: ${cpu.toFixed(1)}% | RAM: ${ram.toFixed(1)}%`);
  }, 3000); 
}

main()
  .catch((e) => {
    console.error("Erreur lors de la simulation:", e);
    process.exit(1);
  });