import { PrismaClient } from '@prisma/client';
import * as si from 'systeminformation'; // <-- Import de la librairie

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Début de la simulation avec les VRAIES métriques...");
  
  let server = await prisma.server.findFirst({ where: { name: "Serveur-Test-01" } });
  if (!server) {
    server = await prisma.server.create({
      data: { name: "Serveur-Test-01", ip_address: "192.168.1.100", status: "active" }
    });
  }

  // Boucle toutes les 3 secondes
  setInterval(async () => {
    // 🟢 Récupération des VRAIES données de ton PC
    const cpuData = await si.currentLoad();
    const memData = await si.mem();

    const realCpu = cpuData.currentLoad; // Pourcentage réel du CPU
    const realRam = (memData.active / memData.total) * 100; // Pourcentage réel de la RAM
    const disk = Math.random() * 500; // (Le disk IO est plus complexe à avoir en temps réel, on garde le random pour l'exemple)

    await prisma.metric.create({
      data: {
        server_id: server.id,
        cpu_usage: parseFloat(realCpu.toFixed(2)),
        ram_usage: parseFloat(realRam.toFixed(2)),
        disk_io: parseFloat(disk.toFixed(2))
      }
    });
    
    console.log(`📊 Réelles métriques - CPU: ${realCpu.toFixed(1)}% | RAM: ${realRam.toFixed(1)}%`);

    // Tes alertes fonctionneront maintenant sur les VRAIES valeurs !
    if (realCpu > 90) {
      await prisma.alert.create({
        data: { server_id: server.id, message: `CPU réel critique: ${realCpu.toFixed(1)}%`, severity: "CRITICAL" }
      });
    }
  }, 3000); 
}

main().catch(console.error);