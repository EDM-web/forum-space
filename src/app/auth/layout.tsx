import { getSession } from "@/lib/getSession";
import { postsPath } from "@/path";
import { redirect } from "next/navigation";

const AuthLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await getSession();

  if (session) {
    redirect(postsPath);
  }
  return <>{children}</>;
};

export default AuthLayout;
