// Test RLS: can we read a specific review by ID with anon key?
import https from "https";

const SUPABASE_URL = "https://zwmdhfdagvvaotojidmm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hVh71mwnULkg4MvHVGW3jA_VdApjQSZ";

function nodeGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(parsed, {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
    }, res => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString();
        try { resolve({ status: res.statusCode, body: JSON.parse(body) }); }
        catch { resolve({ status: res.statusCode, body }); }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

const reviewId = "510e3a79-a4f5-439e-be47-9ac7ea5d0792";

// Test 1: Fetch all reviews
const allReviews = await nodeGet(
  `${SUPABASE_URL}/rest/v1/reviews?select=id,apartment_id,created_at&order=created_at.desc&limit=3`
);
console.log("All reviews status:", allReviews.status);
console.log("All reviews count:", Array.isArray(allReviews.body) ? allReviews.body.length : "not array");

// Test 2: Fetch specific review by ID
const specificReview = await nodeGet(
  `${SUPABASE_URL}/rest/v1/reviews?select=id,apartment_id,created_at&id=eq.${reviewId}`
);
console.log("\nSpecific review status:", specificReview.status);
console.log("Specific review:", JSON.stringify(specificReview.body, null, 2));

// Test 3: With single header
const singleReview = await nodeGet(
  `${SUPABASE_URL}/rest/v1/reviews?select=id,apartment_id,created_at&id=eq.${reviewId}`,
  { Accept: "application/vnd.pgrst.object+json" }
);
console.log("\nWith single header, status:", singleReview.status);
console.log("Result:", JSON.stringify(singleReview.body, null, 2));
