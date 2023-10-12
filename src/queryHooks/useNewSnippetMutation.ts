import { Database } from "@/dbtypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isPresent } from "ts-is-present";

export default function useNewSnippetMutation() {
  const queryClient = useQueryClient();
  return useMutation<
    undefined,
    string,
    Database["public"]["Tables"]["snippets"]["Insert"]
  >({
    mutationFn: async ({ name, snippet, lang, user_id }) => {
      const dbClient = createClientComponentClient<Database>();
      const res = await dbClient
        .from("snippets")
        .insert({
          lang: isPresent(lang) ? lang : null,
          name,
          snippet,
          user_id
        });
      if (res.error) {
        throw new Error(res.error.message);
      }
    },
    onSuccess: () => {
      // queryClient.setQueryData(["user"], null);
    }
  });
}
