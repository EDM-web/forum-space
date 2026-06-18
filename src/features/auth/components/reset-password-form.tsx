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
import { useEffect } from "react";
import { resetPassword } from "../actions/reset-password";
import { resetPasswordSchema } from "../schemas/auth.reset-password";
type EditPostFormProps = {
  post: Post;
};
const ResetPasswordForm = () => {
  const { execute, isPending, hasErrored, hasSucceeded } =
    useAction(resetPassword);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const { email } = values;
    execute({ email });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Reset password email send.");
    }
    if (hasErrored) {
      toast.error("Something weng wrong");
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <CardWrapper
      title="Reset Password"
      description="Reset password using your email address"
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

          <div>
            <SubmitButton label="Reset password" isPending={isPending} />
          </div>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
