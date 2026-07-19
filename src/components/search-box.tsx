"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  placeholder: string;
}

const SearchBox = ({ placeholder }: Props) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const changeHandler = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      const value = event.target.value;
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      replace(`${pathName}?${params.toString()}`, { scroll: false });
    },
    300
  );
  return (
    <Input
      placeholder={placeholder}
      onChange={changeHandler}
      defaultValue={
        searchParams.get("search")
          ? searchParams.get("search")?.toString()
          : undefined
      }
    />
  );
};

export default SearchBox;

// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { Input } from "./ui/input";

// interface Props {
//   placeholder: string;
// }

// const SearchBox = ({ placeholder }: Props) => {
//   const searchParams = useSearchParams();
//   const pathName = usePathname();
//   const { replace } = useRouter();

//   const handleSearch = (
//     event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
//   ) => {
//     const params = new URLSearchParams(searchParams);

//     const value = event.target.value;

//     if (value) {
//       params.set("search", value);
//     } else {
//       params.delete("search");
//     }

//     replace(`${pathName}?${params.toString()}`, { scroll: false });
//   };
//   return <Input placeholder={placeholder} onChange={handleSearch} />;
// };

// export default SearchBox;
