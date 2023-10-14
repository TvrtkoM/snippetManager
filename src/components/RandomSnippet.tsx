"use client";
import useRandomSnippetQuery from "@/queryHooks/useRandomSnippetQuery";
import React from "react";
import SnippetView from "./snippets/SnippetView";

function RandomSnippet() {
  const { data: randomSnippet } = useRandomSnippetQuery();

  if (!randomSnippet) {
    return null;
  }

  return (
    <div>
      <h1 className="text-lg font-medium my-5 uppercase">Random Snippet</h1>
      <SnippetView snippet={randomSnippet} />
    </div>
  );
}

export default RandomSnippet;
