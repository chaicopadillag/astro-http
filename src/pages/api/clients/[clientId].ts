import type { APIRoute } from 'astro';
import { clients, db, eq } from 'astro:db';

export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    const { clientId = '' } = params;
    const body = await request.json();

    const updated = await db.update(clients).set(body).where(eq(clients.id, +clientId)).execute();

    if (updated.rowsAffected === 0) {
      return new Response(
        JSON.stringify({
          message: 'Client not found'
        }),
        {
          status: 404,
          headers: {
            'content-type': 'application/json'
          }
        }
      );
    }

    const client = await db.select().from(clients).where(eq(clients.id, +clientId)).get();

    return new Response(JSON.stringify(client), {
      headers: {
        'content-type': 'application/json'
      }
    });
  } catch (error) {
    console.log('Error updating client', error);
    return new Response(
      JSON.stringify({
        message: 'Error updating client'
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

export const DELETE: APIRoute = async ({ request, params }) => {
  try {
    const { clientId = '' } = params;
    const deleted = await db.delete(clients).where(eq(clients.id, +clientId)).execute();

    if (deleted.rowsAffected === 0) {
      return new Response(
        JSON.stringify({
          message: 'Client not found'
        }),
        {
          status: 404,
          headers: {
            'content-type': 'application/json'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Client deleted'
      }),
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.log('Error deleting client', error);
    return new Response(
      JSON.stringify({
        message: 'Error deleting client'
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
