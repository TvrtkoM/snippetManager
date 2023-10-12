import type { Database } from "@/dbtypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation<undefined, string, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      const dbClient = createClientComponentClient<Database>();
      const res = await dbClient.auth.signInWithPassword({ email, password });
      if (res.error) {
        throw res.error.message;
      }
    },
    onSuccess: () => {
      console.log("success");

      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.log(error);
    }
  });
}
