import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zwmdhfdagvvaotojidmm.supabase.co",
  "sb_publishable_hVh71mwnULkg4MvHVGW3jA_VdApjQSZ",
  { auth: { persistSession: false, autoRefreshToken: false } }
);

const { data, error } = await supabase
  .from("reviews")
  .select("id, apartment_id, created_at, written_review")
  .order("created_at", { ascending: false })
  .limit(3);

if (error) {
  console.error("Error:", error);
} else {
  console.log("Latest reviews:");
  console.log(JSON.stringify(data, null, 2));
}
