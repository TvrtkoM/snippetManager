import { Tables } from "@/types";
import { Flex, Strong, Text } from "@radix-ui/themes";
import React from "react";
import CodeEditor from "../CodeEditor";
import { isPresent } from "ts-is-present";
import Link from "next/link";

function SnippetView({ snippet }: { snippet: Tables<"snippets"> }) {
  return (
    <Flex direction="column">
      <Flex justify="between" mb="2">
        <Flex align="end">
          <Text mr="3" size="4">
            <Strong>Snippet name:</Strong>
          </Text>
          <Text size="4">{snippet.name}</Text>
        </Flex>
        <Flex align="end">
          <Text mr="3" size="2">
            <Strong>Type:</Strong>
          </Text>
          <Text size="2">{snippet.lang ?? "text"}</Text>
        </Flex>
      </Flex>
      <CodeEditor
        value={snippet.snippet ?? undefined}
        lang={isPresent(snippet.lang) ? snippet.lang : "text"}
        readOnly
      />
      <Flex mt="2" align="center">
        <Text mr="3" size="2">
          <Strong>Created by:</Strong>
        </Text>
        <Link href={"/snippets?userId=" + snippet.user_id}>
          <Text className="underline" size="2">
            {snippet.user_id}
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}

export default SnippetView;
