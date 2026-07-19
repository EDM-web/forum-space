"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  defaultValue: string;
  options: { label: string; value: string }[];
};

const SortSelect = ({ defaultValue, options }: Props) => {
  const pathName = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      params.delete("sort");
    } else if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-3">
      <p>Filter</p>
      <Select
        defaultValue={searchParams.get("sort")?.toString() || defaultValue}
        onValueChange={handleSelect}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelect;
