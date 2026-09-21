import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // <-- AJOUT 3 : Permet de générer un build Docker plus léger
};

export default nextConfig;
