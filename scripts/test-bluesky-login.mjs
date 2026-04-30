// Quick test to verify Bluesky credentials work
import { BskyAgent } from "@atproto/api";
import http from "node:http";
import https from "node:https";

// Read env manually
import { readFileSync } from "fs";
const envLines = readFileSync(".env.local", "utf-8").split("\n");
const env = {};
for (const line of envLines) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

console.log("BLUESKY_IDENTIFIER:", env.BLUESKY_IDENTIFIER);
console.log("BLUESKY_APP_PASSWORD:", env.BLUESKY_APP_PASSWORD);
console.log("BLUESKY_SERVICE_URL:", env.BLUESKY_SERVICE_URL);

function nodeGet(url, method = "GET", body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const transport = parsed.protocol === "https:" ? https : http;
    const req = transport.request(parsed, {
      method,
      headers: { "Content-Type": "application/json", ...headers },
    }, res => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        const data = Buffer.concat(chunks).toString();
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Test login
const loginResp = await nodeGet(
  `${env.BLUESKY_SERVICE_URL}/xrpc/com.atproto.server.createSession`,
  "POST",
  { identifier: env.BLUESKY_IDENTIFIER, password: env.BLUESKY_APP_PASSWORD }
);
console.log("\nLogin status:", loginResp.status);
console.log("Login response:", JSON.stringify(loginResp.body, null, 2).substring(0, 500));
