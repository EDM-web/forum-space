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
import { Post } from "../../../../generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "./delete-button";

interface Props extends Post {
  isCard?: boolean;
}

const PostItem = ({ id, title, body, isCard = true, status }: Props) => {
  // const deleteHandler = async () => {
  //   await deletePost(id as string);
  // };
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
      </CardHeader>
      {isCard && (
        <CardContent className="space-x-4">
          <Button variant="default">
            <Link href={singlePostPath(id)}>View</Link> <ArrowRight />
          </Button>

          <Button variant="secondary">
            <Link href={editPostPath(id)}>Edit</Link> <Edit />
          </Button>
        </CardContent>
      )}
      {!isCard && <DeleteButton id={id} />}
    </Card>
  );
};

export default PostItem;
