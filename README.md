# CloudMetrics Dashboard

Plateforme SaaS de monitoring d'infrastructure en temps réel, développée avec Next.js et déployée sur Azure.

## Fonctionnalités

-  Visualisation temps réel des métriques serveurs (CPU, RAM, I/O)
-  Graphiques interactifs avec Recharts
-  Authentification sécurisée (Clerk)
-  Base de données MySQL sur Azure Cloud
-  Interface moderne avec Tailwind CSS

## Stack Technique

- **Frontend** : Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend** : Next.js API Routes, Prisma ORM
- **Base de données** : Azure Database for MySQL (Flexible Server)
- **Authentification** : Clerk
- **Visualisation** : Recharts

## Utilisation avec Docker

L'image est disponible publiquement sur Docker Hub. Pour lancer le projet localement :

1. Assurez-vous d'avoir [Docker](https://www.docker.com/) installé.
2. Créez un fichier `.env` à la racine du projet en vous basant sur `.env.example`.
3. Exécutez la commande suivante :

```bash
docker run -p 3000:3000 --env-file .env ton_username/cloudmetrics-dashboard:latest

## Installation

```bash
# Cloner le repo
git clone https://github.com/Ilyas11-03/cloudmetrics-dashboard.git
cd cloudmetrics-dashboard

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos credentials

# Lancer le serveur de développement
npm run dev
