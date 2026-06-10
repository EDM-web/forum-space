"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAction } from "next-safe-action/hooks";
import { deletePost } from "../actions/delete-post";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { isPending, execute, hasErrored, hasSucceeded } =
    useAction(deletePost);
  return (
    <CardFooter>
      <Dialog>
        <DialogTrigger>
          <Button variant={"destructive"} size={"sm"}>
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure to delete?</DialogTitle>
            <DialogDescription>
              This will permanently delete your post and remove your data from
              our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button
              variant={"destructive"}
              disabled={isPending}
              onClick={() => execute({ id })}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardFooter>
  );
};

export default DeleteButton;
