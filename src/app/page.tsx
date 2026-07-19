import Heading from "@/components/heading";
import PostList from "@/features/posts/components/post-list";
import { Suspense } from "react";
import Loading from "./posts/[id]/loading";
import { SearchParams } from "@/features/posts/types/search-params";

type Props = {
  searchParams: Promise<SearchParams>;
};

async function Home({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <main>
      <Heading title="All Posts" description="View all forum posts" />
      <Suspense fallback={<Loading />}>
        <PostList searchParams={params} userId={undefined} />
      </Suspense>
    </main>
  );
}

export default Home;
