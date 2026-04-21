import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Next's generated output out of OneDrive-synced project folders on Windows.
  distDir: "../../../AppData/Local/Temp/uiuc-apartments-next",
};

export default nextConfig;
