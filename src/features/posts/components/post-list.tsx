import PostItem from "@/features/posts/components/post-item";
import { getAllPosts } from "../queries/get-all-posts";

interface Props {
  userId: string | undefined;
}
const PostList = async ({ userId }: Props) => {
  const posts = await getAllPosts(userId);
  return (
    <div className="space-y-6 my-6">
      {posts.map((post) => (
        <PostItem {...post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
