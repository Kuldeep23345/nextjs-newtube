'use client'

import { trpc } from "@/trpc/client"

export const VidoeSection = () => {
    const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery({limit:5},{
        getNextPageParam:(lastPage)=>lastPage.nextCursor,
    })
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}
