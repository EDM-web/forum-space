"use client";

// import { updatePost } from "../actions/update-post";
import CardWrapper from "../../../components/card-wrapper";
import { Textarea } from "@/components/ui/textarea";
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
import { signUpSchema } from "../schemas";
import { signUp } from "../actions/signup";
import { useEffect } from "react";
import Link from "next/link";
import { signInPath } from "@/path";
import GithubOauthButton from "./github-oauth-button";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
type EditPostFormProps = {
  post: Post;
};
const SignUpForm = () => {
  const { execute, isPending, result } = useAction(signUp);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    const { name, email, password, confirmPassword } = values;
    execute({ name, email, password, confirmPassword });
  }

  const Footer = () => {
    return (
      <div>
        <p className="font-medium text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link href={signInPath} className="underline">
            Sign in
          </Link>
        </p>
      </div>
    );
  };

  useEffect(() => {
    const data = result.data;

    if (!data) {
      return;
    }

    if (data?.success) {
      toast.success("Sign up successfully");
      redirect(signInPath);
    } else if (data?.error) {
      toast.error(data.error);
    }
  }, [result]);
  return (
    <CardWrapper
      title="Sign up"
      description="Create a new account"
      footer={<Footer />}
    >
      <form
        id="form-rhf-input"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FieldGroup>
          {/* Name field  */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-username">
                  Full Name
                </FieldLabel>

                <Input
                  {...field}
                  id="form-rhf-input-username"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

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

          {/* confirmPassword Field  */}
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel>Confirm Password</FieldLabel>
                  {/* <FieldDescription>
                    For best results, select the language you speak.
                  </FieldDescription> */}
                  <Input
                    {...field}
                    id="form-rhf-input-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Same as password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />

          {/* <div>
            <Button type="submit" variant={"default"} disabled={isPending}>
              {isPending ? <LoaderCircle className="animate-spin" /> : "Update"}
            </Button>
          </div> */}
          <div>
            <SubmitButton label="Sign up" isPending={isPending} />
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

export default SignUpForm;
