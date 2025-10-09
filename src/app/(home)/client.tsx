"use client";

import { trpc } from "@/trpc/client";

const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({
    text: "kunal",
  });
  return <div>page client says:{data.greeting}</div>;
};

export default PageClient;
