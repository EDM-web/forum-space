import Loading from "@/app/posts/[id]/loading";
import ChangePasswordForm from "@/features/auth/components/change-password-form";
import { Suspense } from "react";

const ChangePasswordPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ChangePasswordForm />
    </Suspense>
  );
};

export default ChangePasswordPage;
