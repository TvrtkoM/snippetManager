"use client";
import React, { use, useEffect } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import {
  Box,
  Button,
  Callout,
  Flex,
  Select,
  Text,
  TextField
} from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { red } from "@radix-ui/colors";
import useNewSnippetMutation from "@/queryHooks/useNewSnippetMutation";
import { useUserQuery } from "@/queryHooks/useUserQuery";

type Lang = "javascript" | "python" | "text";

const getExtension = (lang: Lang) => {
  switch (lang) {
    case "javascript":
      return javascript({ jsx: true, typescript: true });
    case "python":
      return python();
    default:
      return;
  }
};

type SnippetFormData = {
  name: string;
  lang: Lang;
  snippet: string;
};

function NewSnippetPage() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isValid }
  } = useForm<SnippetFormData>({
    defaultValues: { lang: "text" },
    mode: "all",
    reValidateMode: "onChange"
  });
  const extension = getExtension(watch("lang"));
  const { data: user } = useUserQuery();
  const {
    mutate: createSnippet,
    isSuccess,
    error: createSnippetError
  } = useNewSnippetMutation();

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!createSnippetError) {
      return;
    }
    setError("root", { message: createSnippetError });
  }, [createSnippetError]);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        createSnippet({
          ...data,
          user_id: user?.id,
          lang: data.lang === "text" ? null : data.lang
        });
      })}
    >
      <Box>
        {errors.root && (
          <Callout.Root className="mb-4" variant="soft" color="red">
            <Callout.Text>{errors.root.message}</Callout.Text>
          </Callout.Root>
        )}
        <Flex align="center" gap="3" mb="2">
          <Text>Snippet name</Text>
          <TextField.Root className="flex-grow">
            <TextField.Input
              variant="soft"
              color={errors.name ? "red" : undefined}
              placeholder="Snippet name"
              {...register("name", { required: true })}
            ></TextField.Input>
          </TextField.Root>
        </Flex>
        <Flex gap="3" align="center" justify="end" mb="1">
          <Text size="2">type:</Text>
          <Controller
            control={control}
            name="lang"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => {
              return (
                <Select.Root
                  defaultValue={value}
                  onValueChange={onChange}
                  size="1"
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="text">text</Select.Item>
                    <Select.Item value="javascript">
                      javascript / typescript
                    </Select.Item>
                    <Select.Item value="python">python</Select.Item>
                  </Select.Content>
                </Select.Root>
              );
            }}
          />
        </Flex>
        <Controller
          control={control}
          name="snippet"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => {
            return (
              <ReactCodeMirror
                style={{
                  border: errors.snippet ? `2px solid ${red.red8}` : undefined,
                  borderRadius: "12px",
                  padding: "3px"
                }}
                value={value}
                extensions={extension ? [extension] : []}
                height="500px"
                onChange={onChange}
              ></ReactCodeMirror>
            );
          }}
        />
        <Button mt="4" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default NewSnippetPage;
