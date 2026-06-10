import { ZodError } from "zod";

export type ActionState = {
  message: string;
  payload?: FormData;
  code?: string;
};

export const actionStateFilter = (
  error: unknown,
  formData: FormData
): ActionState => {
  if (error instanceof ZodError) {
    const errorCode = error.issues[0]?.code;
    const errorMessage = error.issues[0]?.message;
    return {
      message: errorMessage,
      payload: formData,
      code: errorCode,
    };
  } else {
    return {
      message: "Unknown error occured",
      payload: formData,
    };
  }
};
