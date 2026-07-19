import PostItem from "@/features/posts/components/post-item";
import { getAllPosts } from "../queries/get-all-posts";
import SearchBox from "@/components/search-box";
import { SearchParams } from "../types/search-params";
import SortSelect from "@/components/sort-select";

interface Props {
  userId: string | undefined;
  searchParams: SearchParams;
}
const PostList = async ({ userId, searchParams }: Props) => {
  const posts = await getAllPosts(userId, searchParams);
  return (
    <div className="space-y-6 my-6">
      <SearchBox placeholder="search post with title" />
      {/* For Sort  */}
      <SortSelect
        defaultValue="desc"
        options={[
          {
            label: "Newest",
            value: "desc",
          },
          {
            label: "Oldest",
            value: "asc",
          },
        ]}
      />
      {posts.map((post) => (
        <PostItem {...post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
