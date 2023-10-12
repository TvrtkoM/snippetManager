"use client";
import useSnippetsQuery from "@/queryHooks/useSnippetsQuery";
import React from "react";

function SnippetsPage() {
  const { data: snippets } = useSnippetsQuery();

  return <div>SnippetsPage</div>;
}

export default SnippetsPage;
