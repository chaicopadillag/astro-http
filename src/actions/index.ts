import { defineAction } from 'astro:actions';
import { db, eq, likes } from 'astro:db';
import { z } from 'astro:schema';

export const server = {
  getLikesPost: defineAction({
    input: z.object({
      postId: z.string()
    }),
    handler: async (payload) => {
      const likePost = await db.select().from(likes).where(eq(likes.postId, payload.postId)).get();

      if (!likePost) {
        return {
          likes: 0
        };
      }

      return {
        likes: likePost.likes
      };
    }
  }),
  updatePostLikes: defineAction({
    input: z.object({
      postId: z.string(),
      likes: z.number()
    }),
    handler: async (payload) => {
      console.log({ payload });

      const likePost = await db.select().from(likes).where(eq(likes.postId, payload.postId)).get();

      if (!likePost) {
        await db
          .insert(likes)
          .values({
            postId: payload.postId,
            likes: payload.likes
          })
          .execute();
      } else {
        await db
          .update(likes)
          .set({
            likes: likePost.likes + payload.likes
          })
          .where(eq(likes.postId, payload.postId))
          .execute();
      }

      const updatedLikePost = await db.select().from(likes).where(eq(likes.postId, payload.postId)).get();
      console.log({ updatedLikePost });

      return updatedLikePost;
    }
  })
};
