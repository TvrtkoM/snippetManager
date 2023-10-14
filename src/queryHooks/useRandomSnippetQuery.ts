import { Database } from "@/dbtypes";
import { Tables } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";

export default function useRandomSnippet() {
  return useQuery<Tables<"snippets"> | null>(
    ["random-snippet"],
    async () => {
      const dbClient = createClientComponentClient<Database>();
      const rows = await dbClient.from("snippets").select();
      const size = rows.data?.length;
      const random = size && Math.floor(Math.random() * size);
      return rows.data?.[random ?? 0] ?? null;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  );
}
