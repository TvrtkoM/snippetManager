"use client";
import useLogoutMutation from "@/queryHooks/useLogoutMutation";
import { useUserQuery } from "@/queryHooks/useUserQuery";
import { Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { blueDark, grayP3 } from "@radix-ui/colors";

function AuthBar() {
  const { data: user, isLoading } = useUserQuery();
  const loggedIn = Boolean(user);
  const path = usePathname();

  const { mutate: logout } = useLogoutMutation();

  if (path === "/login" || path === "/register") {
    return null;
  }

  return (
    <Flex
      gap="3"
      justify="between"
      px="3"
      style={{
        backgroundColor: blueDark.blue1,
        color: grayP3.gray3
      }}
    >
      {loggedIn ? (
        <>
          <Box>
            <Text size="3">Hi, {user?.email}</Text>
          </Box>
          <Box>
            <Text size="3" className="cursor-pointer" onClick={() => logout()}>
              Log out
            </Text>
          </Box>
        </>
      ) : isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <Link href={"/login"}>
            <Text>Log in</Text>
          </Link>
          <Link href={"/register"}>
            <Text>Register</Text>
          </Link>
        </>
      )}
    </Flex>
  );
}

export default AuthBar;
