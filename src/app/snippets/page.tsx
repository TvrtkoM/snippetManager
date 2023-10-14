"use client";
import SnippetsList from "@/components/snippets/SnippetsList";
import useSnippetsQuery from "@/queryHooks/useSnippetsQuery";
import { useSearchParams } from "next/navigation";
import React from "react";

function SnippetsPage() {
  const { data: snippets } = useSnippetsQuery();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  return (
    <div>
      <SnippetsList userId={userId ?? undefined}></SnippetsList>
    </div>
  );
}

export default SnippetsPage;
