import { Separator } from "./ui/separator";

interface Props {
  title: string;
  description?: string;
}

const Heading = ({ title, description }: Props) => {
  return (
    <div>
      <h1 className="font-bold text-lg">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
      <Separator className="mt-2 mb-6" />
    </div>
  );
};

export default Heading;
