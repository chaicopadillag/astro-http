import { column, defineDb, defineTable } from 'astro:db';

const clients = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean()
  }
});

const likes = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    likes: column.number(),
    postId: column.text()
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    clients,
    likes
  }
});
