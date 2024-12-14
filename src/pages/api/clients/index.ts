import type { APIRoute } from 'astro';
import { clients, db } from 'astro:db';

export const GET: APIRoute = async ({ request }) => {
  const clientsDb = await db.select().from(clients).all();

  return new Response(JSON.stringify(clientsDb), {
    headers: {
      'content-type': 'application/json'
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const lastAdd = await db.insert(clients).values(body).execute();

    console.log(lastAdd);

    return new Response(
      JSON.stringify({
        message: 'Client registered',
        clientId: lastAdd.lastInsertRowid?.toString()
      }),
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.log('Error registering client', error);
    return new Response(
      JSON.stringify({
        message: 'Error registering client'
      }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }
};
