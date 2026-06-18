import ResetPasswordEmailTemplate from "@/features/auth/components/reset-password-email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Options {
  to: string;
  subject: string;
  resetPasswordLink: string;
}

export const sendEmail = async ({
  to,
  subject,
  resetPasswordLink,
}: Options) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Forum Space <onboarding@resend.dev>",
      to,
      subject,
      react: ResetPasswordEmailTemplate({ resetPasswordLink }),
    });

    // if (error) {
    //   return Response.json({ error }, { status: 500 });
    // }

    // return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
