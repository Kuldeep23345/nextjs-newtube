"use client";

import { trpc } from "@/trpc/client";

interface CategoriesSessionProps {
  categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSessionProps) => {
  const [categories] = trpc.categroies.getMany.useSuspenseQuery();

  return <div>{JSON.stringify(categories)}</div>;
};
