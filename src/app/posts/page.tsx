import Heading from "@/components/heading";
import PostList from "@/features/posts/components/post-list";
import { Suspense } from "react";
import Loading from "./[id]/loading";
import CreatePostForm from "@/features/posts/components/create-post-form";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { signInPath } from "@/path";

// export const dynamic = "force-dynamic";
// export const revalidate = 10;

const Posts = async () => {
  const session = await getSession();

  if (!session) {
    redirect(signInPath);
  }

  return (
    <main>
      <Heading
        title={`Hello! ${session.user.name}`}
        description="View all your forum posts"
      />
      <CreatePostForm />
      <Suspense fallback={<Loading />}>
        <PostList userId={session.user.id} />
      </Suspense>
    </main>
  );
};

export default Posts;
