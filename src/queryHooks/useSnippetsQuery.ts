import { useQuery } from "@tanstack/react-query";
import { Database } from "@/dbtypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function useSnippetsQuery() {
  const dbClient = createClientComponentClient<Database>();
  return useQuery<Database["public"]["Tables"]["snippets"]["Row"][]>(
    ["snippets"],
    async () => {
      const res = await dbClient.from("snippets").select("*");
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
    {}
  );
}

export function useSnippetsForUserQuery(userId: string) {
  return useQuery<Database["public"]["Tables"]["snippets"]["Row"][]>(
    ["snippets", userId],
    async () => {
      const dbClient = createClientComponentClient<Database>();
      const res = await dbClient
        .from("snippets")
        .select("*")
        .eq("user_id", userId);
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
    { enabled: !!userId }
  );
}
