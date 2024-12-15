import { getCollection } from 'astro:content';
import { clients, db, likes } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db
    .insert(clients)
    .values([
      { id: 1, name: 'Alice', age: 30, isActive: true },
      { id: 2, name: 'Bob', age: 25, isActive: true },
      { id: 3, name: 'Charlie', age: 35, isActive: false }
    ])
    .execute();

  const posts = await getCollection('blog');
  await db
    .insert(likes)
    .values(
      posts.map((post) => ({
        likes: Math.floor(Math.random() * 100),
        postId: post.id
      }))
    )
    .execute();
}
