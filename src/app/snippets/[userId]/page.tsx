"use client";
import useSnippetsQuery, {
  useSnippetsForUserQuery
} from "@/queryHooks/useSnippetsQuery";
import React from "react";

function SnippetsPage({ params }: { params: { userId: string } }) {
  const { data: snippets } = useSnippetsForUserQuery(params.userId);

  return <div>SnippetsPage</div>;
}

export default SnippetsPage;
