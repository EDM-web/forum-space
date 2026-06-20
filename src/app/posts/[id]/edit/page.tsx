import EditPostForm from "@/features/posts/components/edit-post-form";
import { getSinglePost } from "@/features/posts/queries/get-single-post";
import { isOwner } from "@/lib/is-owner";
import { notFound } from "next/navigation";

// interface EditPostPageProps {
//   params: Promise<{ id: string }>;
// }
const EditPostPage = async (props: PageProps<"/posts/[id]">) => {
  const { id } = await props.params;
  const post = await getSinglePost(id);
  const owner = await isOwner(post?.user.id!); //note ! operator

  if (!post || !owner) {
    notFound();
  }

  return <EditPostForm post={post} />;
};

export default EditPostPage;
