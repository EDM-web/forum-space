import Heading from "@/components/heading";
import PostList from "@/features/posts/components/post-list";
import { Suspense } from "react";
import Loading from "./[id]/loading";
import CreatePostForm from "@/features/posts/components/create-post-form";

// export const dynamic = "force-dynamic";
// export const revalidate = 10;

const Posts = async () => {
  return (
    <main>
      <Heading title="All Posts" description="View all forum post" />
      <CreatePostForm />
      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </main>
  );
};

export default Posts;
