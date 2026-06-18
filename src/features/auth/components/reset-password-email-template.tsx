// Get the full source code, including the theme and Tailwind config:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface DropboxResetPasswordEmailProps {
  userFirstname?: string;
  resetPasswordLink: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.BETTER_AUTH_URL;

export const ResetPasswordEmailTemplate = ({
  userFirstname,
  resetPasswordLink,
}: DropboxResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Body className="bg-[#f6f9fc] py-2.5">
        <Preview>Dropbox reset your password</Preview>
        <Container className="bg-white p-11 border border-[#f0f0f0] border-solid">
          <Img
            src={`${baseUrl}/static/dropbox-logo.png`}
            width="40"
            height="33"
            alt="Dropbox"
          />
          <Section>
            <Text className="font-dropbox font-light text-[#404040] text-base leading-6">
              Hi {userFirstname},
            </Text>
            <Text className="font-dropbox font-light text-[#404040] text-base leading-6">
              Someone recently requested a password change for your Dropbox
              account. If this was you, you can set a new password here:
            </Text>
            <Button
              className="block bg-[#007ee6] px-1.75 py-3.5 rounded w-52 font-dropbox-sans text-[15px] text-white text-center no-underline"
              href={resetPasswordLink}
            >
              Reset password
            </Button>
            <Text className="font-dropbox font-light text-[#404040] text-base leading-6">
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text className="font-dropbox font-light text-[#404040] text-base leading-6">
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our Help Center for{" "}
              <Link className="underline" href={resetPasswordLink}>
                more security tips.
              </Link>
            </Text>
            <Text className="font-dropbox font-light text-[#404040] text-base leading-6">
              Happy Dropboxing!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmailTemplate.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://www.dropbox.com",
} as DropboxResetPasswordEmailProps;

export default ResetPasswordEmailTemplate;
