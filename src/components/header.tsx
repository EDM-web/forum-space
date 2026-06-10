import { aboutPath, homePath, postsPath } from "@/path";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./darkmode-toggler";

const Header = () => {
  return (
    <div className="flex justify-between items-center mt-2 mb-4">
      <Link href={homePath} className="font-extrabold text-2xl">
        Dev.io{" "}
      </Link>
      <div className="flex">
        {/* <Button variant={'link'}><Link href={HOME}>Home</Link></Button> */}
        <Button variant={"link"}>
          <Link href={postsPath}>Posts</Link>
        </Button>
        <Button variant={"link"}>
          <Link href={aboutPath}>About</Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
