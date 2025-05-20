"use client";
import React from "react";
import { signInWithCredentials } from "../../../../../serverActions/auth";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { boolean, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import {
  TextFormItem,
  TextPasswordFormItem,
} from "@/components/common/form/text/text-form";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z
    .string({ message: "계정을 입력해주세요." })
    .min(2, { message: "두 글자 이상 입력해주세요." }),
  password: z
    .string({ message: "비밀번호를 입력해주세요." })
    .min(2, { message: "두 글자 이상 입력해주세요." }),
});

type Login = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-4" action={signInWithCredentials}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <TextFormItem label="Email" placeholder="Email" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <TextPasswordFormItem label="Password" placeholder="Password" />
          )}
        />
        <Button>Login</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
