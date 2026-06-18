"use client";

// import { updatePost } from "../actions/update-post";
import CardWrapper from "../../../components/card-wrapper";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
// import { postUpdateSchema } from "../schemas";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Post } from "../../../../generated/prisma/client";
import SubmitButton from "@/components/submit-button";
import { signInSchema } from "../schemas";
import { useEffect } from "react";
import { signIn } from "../actions/signin";
import { resetPasswordPath, signUpPath } from "@/path";
import Link from "next/link";
import GithubOauthButton from "./github-oauth-button";
import { Separator } from "@/components/ui/separator";
type EditPostFormProps = {
  post: Post;
};
const SignInForm = () => {
  const { execute, isPending, hasErrored, hasSucceeded } = useAction(signIn);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    const { email, password } = values;
    execute({ email, password });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Sign in successfully");
    }
    if (hasErrored) {
      toast.error("Something weng wrong");
    }
  }, [hasErrored, hasSucceeded]);

  const Footer = () => {
    return (
      <div className="flex justify-between w-full font-medium text-muted-foreground text-sm">
        <p>
          Don't have an account?{" "}
          <Link href={signUpPath} className="underline">
            Sign up
          </Link>
        </p>

        <Link href={resetPasswordPath} className="underline">
          forgot passowrd?
        </Link>
      </div>
    );
  };
  return (
    <CardWrapper
      title="Sign in"
      description="Sign in your existing account"
      footer={<Footer />}
    >
      <form
        id="form-rhf-input"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FieldGroup>
          {/* Email field  */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-username">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-username"
                  aria-invalid={fieldState.invalid}
                  placeholder="example@gmail.com"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Password Field  */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="form-rhf-select-language">
                    Password
                  </FieldLabel>
                  {/* <FieldDescription>
                    For best results, select the language you speak.
                  </FieldDescription> */}
                  <Input
                    {...field}
                    id="form-rhf-input-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />

          <div>
            <SubmitButton label="Sign in" isPending={isPending} />
          </div>
        </FieldGroup>
      </form>

      <div className="py-6">
        <Separator />
      </div>

      <GithubOauthButton />
    </CardWrapper>
  );
};

export default SignInForm;
