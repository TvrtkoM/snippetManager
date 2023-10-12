import { createClient } from "@supabase/supabase-js";
import { isPresent } from "ts-is-present";

function createDbClient() {
  if (
    !isPresent(process.env.SUPABASE_URL) ||
    !isPresent(process.env.SUPABASE_API_KEY)
  ) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_API_KEY environment variables"
    );
  }
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);
}

export const dbClient = createDbClient();
