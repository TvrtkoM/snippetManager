import { Database } from "@/dbtypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
  return useQuery(
    ["user"],
    async () => {
      const dbClient = createClientComponentClient<Database>();
      const { data } = await dbClient.auth.getUser();
      return data.user;
    },
    { refetchOnWindowFocus: false, refetchInterval: 60 * 1000 }
  );
}
