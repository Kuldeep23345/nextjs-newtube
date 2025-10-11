"use client";

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { FilterCarousel } from "@/components/filter-carousel";
import { useRouter } from "next/navigation";

interface CategoriesSessionProps {
  categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSessionProps) => {
  return (
    <Suspense
      fallback={
        <FilterCarousel
          isLoading
          value={categoryId ?? ""}
          data={[]}
          onSelect={() => {}}
        />
      }
    >
      <ErrorBoundary fallback={<p>Error....</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSessionProps) => {
  const router = useRouter()
  const [categories] = trpc.categroies.getMany.useSuspenseQuery();

  const data = categories.map(({ name, id }) => ({
    value: id,
    label: name,
  }));

  const onSelect = (value:string | null)=>{
    const url = new URL(window.location.href);
    if(value){
      url.searchParams.set('categoryId',value)
    }else{
      url.searchParams.delete('categoryId')
    }
    router.push(url.toString())
  }
  return (
    <FilterCarousel
      onSelect={onSelect}
      value={categoryId ?? ""}
      data={data}
    />
  );
};
