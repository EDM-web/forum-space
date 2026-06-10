"use client";

interface Props {
  error: Error;
}

const Error = ({ error }: Props) => {
  return <div>{error.message || "Something went wrong"}</div>;
};

export default Error;
