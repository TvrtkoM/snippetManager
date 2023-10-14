"use client";
import useLoginMutation from "@/queryHooks/useLogInMutation";
import { useUserQuery } from "@/queryHooks/useUserQuery";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { isPresent } from "ts-is-present";

function LoginPage({}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm<{ email: string; password: string }>({
    reValidateMode: "onChange",
    mode: "all"
  });

  const { mutate, isError, error } = useLoginMutation();
  const onSubmit = (data: { email: string; password: string }) => {
    mutate(data);
  };

  useEffect(() => {
    if (!isPresent(error)) {
      return;
    }
    setError("root", { message: error });
  }, [error]);

  return (
    <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-lg font-medium my-4">Login</h1>
      {errors.root && (
        <Callout.Root className="mb-4" variant="soft" color="red">
          <Callout.Text>{errors.root.message}</Callout.Text>
        </Callout.Root>
      )}
      <div className="flex flex-col w-full space-y-4">
        <TextField.Input
          placeholder="E-mail"
          {...register("email", { required: true })}
          color={errors.email ? "red" : undefined}
          variant="soft"
        />
        <TextField.Input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
          color={errors.password ? "red" : undefined}
          variant="soft"
        />
        <Button disabled={!isValid}>Log in</Button>
      </div>
    </form>
  );
}

export default function () {
  const { data, isLoading, isSuccess } = useUserQuery();

  if (data?.id) {
    redirect("/");
  } else {
    return <LoginPage />;
  }
}
