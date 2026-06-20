"use client";

import { updatePost } from "../actions/update-post";
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
import { postUpdateSchema } from "../schemas";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import { Post } from "../../../../generated/prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "@/components/submit-button";
type EditPostFormProps = {
  post: Post;
};
const EditPostForm = ({ post }: EditPostFormProps) => {
  const { execute, isPending, hasErrored, hasSucceeded } =
    useAction(updatePost);
  const form = useForm<z.infer<typeof postUpdateSchema>>({
    resolver: zodResolver(postUpdateSchema),
    defaultValues: {
      id: post.id as string,
      title: post.title,
      body: post.body,
      status: post.status,
    },
  });

  function onSubmit(values: z.infer<typeof postUpdateSchema>) {
    execute(values);
    // const { id, title, body, status } = values;
    // execute({ id, title, body, status });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Post Updated successfully");
    }
    if (hasErrored) {
      toast.error("Something weng wrong");
    }
  }, [hasErrored, hasSucceeded]);
  return (
    <CardWrapper
      title="Update this existing post"
      description="This will be update the existing post"
    >
      <form
        id="form-rhf-input"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FieldGroup>
          {/* id field */}
          {/* <Controller
            name="id"
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
          /> */}

          {/* title field  */}
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

          {/* body field  */}
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

          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="form-rhf-select-language">
                    Status
                  </FieldLabel>
                  {/* <FieldDescription>
                    For best results, select the language you speak.
                  </FieldDescription> */}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="form-rhf-select-language"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DONE">DONE</SelectItem>
                    <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          {/* <div>
            <Button type="submit" variant={"default"} disabled={isPending}>
              {isPending ? <LoaderCircle className="animate-spin" /> : "Update"}
            </Button>
          </div> */}
          <div>
            <SubmitButton label="Update" isPending={isPending} />
          </div>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
};

export default EditPostForm;
