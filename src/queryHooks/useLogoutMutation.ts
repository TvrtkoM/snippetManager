import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const dbClient = createClientComponentClient();
      await dbClient.auth.signOut();
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    }
  });
}
