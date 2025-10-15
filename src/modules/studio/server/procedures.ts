import { db } from "@/db";
import { videos } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, and, or, lt, desc } from "drizzle-orm";
import { z } from "zod";

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const { id: userId } = ctx.user;

      // start base query
      let query = db
        .select()
        .from(videos)
        .where(eq(videos.userId, userId))
        .orderBy(desc(videos.updatedAt), desc(videos.id))
        .limit(limit + 1);

      // apply cursor pagination if provided
      if (cursor) {
        query = db
          .select()
          .from(videos)
          .where(
            and(
              eq(videos.userId, userId),
              or(
                lt(videos.updatedAt, cursor.updatedAt),
                and(
                  eq(videos.updatedAt, cursor.updatedAt),
                  lt(videos.id, cursor.id)
                )
              )
            )
          )
          .orderBy(desc(videos.updatedAt), desc(videos.id))
          .limit(limit + 1);
      }

      const data = await query;

      const hasMore = data.length > limit;
      const items = hasMore ? data.slice(0, -1) : data;
      const lastItem = items[items.length - 1];
      const nextCursor = hasMore
        ? {
            id: lastItem.id,
            updatedAt: lastItem.updatedAt,
          }
        : null;

      return {
        items,
        nextCursor,
      };
    }),
});
