import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Edit } from "lucide-react";
import Link from "next/link";
import { editPostPath, singlePostPath } from "@/path";
import { cn } from "@/lib/utils";
import { Post, User } from "../../../../generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "./delete-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { isOwner } from "@/lib/is-owner";

interface Props extends Post {
  isCard?: boolean;
  user: User;
}

const PostItem = async ({
  id,
  title,
  body,
  isCard = true,
  status,
  user,
}: Props) => {
  // const deleteHandler = async () => {
  //   await deletePost(id as string);
  // };
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <Card className="relative">
      <CardHeader>
        <Badge
          className="top-4 right-4 absolute"
          variant={status === "IN_PROGRESS" ? "outline" : "default"}
        >
          {status}
        </Badge>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={cn(isCard && "line-clamp-2")}>
          {body}
        </CardDescription>
        <p className="font-medium text-muted-foreground">@{user.name}</p>
      </CardHeader>
      {isCard && (
        <CardContent className="space-x-4">
          <Button variant="default">
            <Link href={singlePostPath(id)}>View</Link> <ArrowRight />
          </Button>

          {(await isOwner(user.id)) && ( //in this line await must have
            <Button variant="secondary">
              <Link href={editPostPath(id)}>Edit</Link> <Edit />
            </Button>
          )}
        </CardContent>
      )}
      {!isCard && (await isOwner(user.id)) && <DeleteButton id={id} />}
    </Card>
  );
};

export default PostItem;
