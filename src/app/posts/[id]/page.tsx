import PostItem from "@/features/posts/components/post-item";
import { getSinglePost } from "@/features/posts/queries/get-single-post";
import { notFound } from "next/navigation";
import { User } from "../../../../generated/prisma/client";

interface Props {
  params: Promise<{ id: string }>;
}

const SinglePost = async ({ params }: Props) => {
  const { id } = await params;

  const post = await getSinglePost(id);

  if (!post) {
    notFound();
  }
  return <PostItem {...post} isCard={false} user={post.user} />;
};

export default SinglePost;
