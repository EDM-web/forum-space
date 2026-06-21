import { homePath, postsPath, signUpPath, signInPath } from "@/path";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./darkmode-toggler";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signOut } from "@/features/auth/actions/signout";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="top-0 sticky flex justify-between items-center mt-2 mb-4">
      <Link href={homePath} className="font-extrabold text-2xl">
        {/* <Image src={Logo} alt="Forum Logo" /> */}
        Forum Space
      </Link>
      <div className="flex items-center gap-2">
        {/* <Button variant={'link'}><Link href={HOME}>Home</Link></Button> */}
        <Button variant={"link"}>
          <Link href={postsPath}>Posts</Link>
        </Button>
        {session ? <SignOutButton /> : <SignUpAndSignInButtons />}
        {/* <Button variant={"link"}>
          <Link href={aboutPath}>About</Link>
        </Button> */}
        {/* for dark/light  */}
        <ModeToggle />
      </div>
    </div>
  );
};

export const SignUpAndSignInButtons = () => {
  return (
    <div className="space-x-2">
      <Button variant={"default"}>
        <Link href={signUpPath}>Sign up</Link>
      </Button>
      <Button variant={"outline"}>
        <Link href={signInPath}>Sign in</Link>
      </Button>
    </div>
  );
};

export const SignOutButton = () => {
  return (
    <form action={signOut}>
      <Button variant={"destructive"} type="submit">
        Sign out
      </Button>
    </form>
  );
};

export default Header;
