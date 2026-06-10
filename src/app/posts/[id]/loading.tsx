import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <Skeleton className="rounded-full w-1/6 h-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          <Skeleton className="rounded-full w-full h-4" />
          <Skeleton className="rounded-full w-full h-4" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="rounded-full w-1/6 h-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          <Skeleton className="rounded-full w-full h-4" />
          <Skeleton className="rounded-full w-full h-4" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="rounded-full w-1/6 h-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          <Skeleton className="rounded-full w-full h-4" />
          <Skeleton className="rounded-full w-full h-4" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="rounded-full w-1/6 h-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          <Skeleton className="rounded-full w-full h-4" />
          <Skeleton className="rounded-full w-full h-4" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="rounded-full w-1/6 h-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          <Skeleton className="rounded-full w-full h-4" />
          <Skeleton className="rounded-full w-full h-4" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="rounded-full w-1/6 h-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          <Skeleton className="rounded-full w-full h-4" />
          <Skeleton className="rounded-full w-full h-4" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="rounded-full w-1/6 h-4" />
        </CardHeader>
        <CardContent className="space-y-1">
          <Skeleton className="rounded-full w-full h-4" />
          <Skeleton className="rounded-full w-full h-4" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Loading;
