// Test if the server-side Supabase client can read a review
// This simulates what the route handler does
import https from "https";
import http from "http";

const SUPABASE_URL = "https://zwmdhfdagvvaotojidmm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hVh71mwnULkg4MvHVGW3jA_VdApjQSZ";

function nodeGet(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const transport = parsed.protocol === "https:" ? https : http;
    const req = transport.request(parsed, {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
    }, res => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString();
        resolve({ status: res.statusCode, body: JSON.parse(body) });
      });
    });
    req.on("error", reject);
    req.end();
  });
}

// Fetch latest reviews
const reviewsResp = await nodeGet(
  `${SUPABASE_URL}/rest/v1/reviews?select=id,apartment_id,created_at&order=created_at.desc&limit=3`
);
console.log("Reviews status:", reviewsResp.status);
console.log("Reviews:", JSON.stringify(reviewsResp.body, null, 2));
