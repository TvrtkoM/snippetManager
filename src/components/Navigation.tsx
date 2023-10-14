"use client";
import { useUserQuery } from "@/queryHooks/useUserQuery";
import { Flex, Section, Tabs } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { isPresent } from "ts-is-present";

function Navigation() {
  const { data: user } = useUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  return (
    <Section size="1" py="0">
      <Tabs.Root
        onValueChange={(path) => router.push(path)}
        value={
          pathname +
          (isPresent(userId) ? `/?userId=${searchParams.get("userId")}` : "")
        }
      >
        <Tabs.List size="2">
          <Tabs.Trigger value="/snippets">Snippets</Tabs.Trigger>
          {user?.id && (
            <Flex justify="between" width="100%">
              <Tabs.Trigger value={"/snippets/?userId=" + user.id}>
                My Snippets
              </Tabs.Trigger>
              <Tabs.Trigger value={"/new-snippet"}>New Snippet</Tabs.Trigger>
            </Flex>
          )}
        </Tabs.List>
      </Tabs.Root>
    </Section>
  );
}

export default Navigation;
