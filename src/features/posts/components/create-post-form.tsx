"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createPost } from "@/features/posts/actions/create-post";
import CardWrapper from "../../../components/card-wrapper";
import SubmitButton from "../../../components/submit-button";
import { useActionState, useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { postCreateSchema } from "../schemas";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
const CreatePostForm = () => {
  const { execute, isPending, hasErrored, hasSucceeded } =
    useAction(createPost);

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Post created", {
        richColors: true,
        position: "bottom-right",
      });
    }
  }, [hasErrored, hasSucceeded]);

  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  function onSubmit(values: z.infer<typeof postCreateSchema>) {
    // const { title, body } = values;
    // execute({ title, body });
    execute(values);
  }

  return (
    <CardWrapper
      title="Create a new post"
      description="This will be create a new post"
    >
      <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-username">Title</FieldLabel>

                <Input
                  {...field}
                  id="form-rhf-input-username"
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-input-username">
                  Description
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-rhf-input-username"
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* <div>
            <Button type="submit" variant={"default"} disabled={isPending}>
              {isPending ? <LoaderCircle className="animate-spin" /> : "Create"}
            </Button>
          </div> */}
          <div>
            <SubmitButton label="Create" isPending={isPending} />
          </div>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};

export default CreatePostForm;
