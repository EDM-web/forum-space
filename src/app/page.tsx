import Heading from "@/components/heading";
import PostList from "@/features/posts/components/post-list";
import { Suspense } from "react";
import Loading from "./posts/[id]/loading";

export default function Home() {
  return (
    <main>
      <Heading title="All Posts" description="View all forum posts" />
      <Suspense fallback={<Loading />}>
        <PostList userId={undefined} />
      </Suspense>
    </main>
  );
}
