import PostItem from "@/features/posts/components/post-item";
import { getAllPosts } from "../queries/get-all-posts";
const PostList = async () => {
  const posts = await getAllPosts();
  return (
    <div className="space-y-6 my-6">
      {posts.map((post) => (
        <PostItem {...post} key={post.id} user={post.user} />
      ))}
    </div>
  );
};

export default PostList;
