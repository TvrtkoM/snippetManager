import { Tables } from "@/types";
import { Flex, Section, Text } from "@radix-ui/themes";
import SnippetView from "./SnippetView";
import { useSnippetsForUserQuery } from "@/queryHooks/useSnippetsQuery";

function SnippetsList({ userId }: { userId?: string }) {
  const { data: snippets } = useSnippetsForUserQuery(userId);
  return snippets?.map((snippet, idx) => {
    return (
      <Section key={idx} size="1">
        <Flex direction="column" className="space-y-2 my-3">
          <SnippetView snippet={snippet} />
        </Flex>
      </Section>
    );
  });
}

export default SnippetsList;
