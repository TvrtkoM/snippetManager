"use client";
import useRegisterMutation from "@/queryHooks/useRegisterMutation";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { isPresent } from "ts-is-present";

function RegisterPage({}) {
  const {
    register,
    handleSubmit,
    setError,
    watch, // Access the 'confirmPassword' field value
    formState: { errors, isValid }
  } = useForm<{ email: string; password: string; confirmPassword: string }>({
    reValidateMode: "onChange",
    mode: "all"
  });

  const { data, mutate, isError, error } = useRegisterMutation();
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
          {...register("password", { required: true })}
          color={errors.password ? "red" : undefined}
          variant="soft"
          type="password"
        />
        <TextField.Input
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) =>
              value === watch("password") || "Passwords don't match"
          })}
          color={errors.confirmPassword ? "red" : undefined}
          variant="soft"
          type="password"
        />
        <Button disabled={!isValid}>Register</Button>
      </div>
    </form>
  );
}

export default RegisterPage;
