const { startServer } = require("next/dist/server/lib/start-server");

const port = Number.parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "127.0.0.1";

startServer({
  dir: process.cwd(),
  port: Number.isFinite(port) ? port : 3000,
  isDev: true,
  hostname,
  allowRetry: true,
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
