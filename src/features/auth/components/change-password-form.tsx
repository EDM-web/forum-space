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
import { changePasswordSchema } from "../schemas/auth.change-password";
import { changePassword } from "../actions/change-password";
import { notFound, useSearchParams } from "next/navigation";
type EditPostFormProps = {
  post: Post;
};
const ChangePasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return notFound();
  }
  const { execute, isPending, hasErrored, hasSucceeded } =
    useAction(changePassword);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      token,
    },
  });

  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    const { newPassword, token } = values;
    execute({ newPassword, token });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Your password has changed.");
    }
    if (hasErrored) {
      toast.error("Something weng wrong");
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <CardWrapper title="Change Password" description="Update your password">
      <form
        id="form-rhf-input"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FieldGroup>
          {/* Email field  */}
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-username">
                  New Password
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-input-username"
                  aria-invalid={fieldState.invalid}
                  placeholder="**********"
                  type="password"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div>
            <SubmitButton label="Change password" isPending={isPending} />
          </div>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};

export default ChangePasswordForm;
