import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

export const GET: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(
      JSON.stringify({
        statusCode: 400,
        message: 'Bad request'
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }

  const post = await getEntry('blog', slug);

  if (!post) {
    return new Response(
      JSON.stringify({
        statusCode: 404,
        message: 'Post not found'
      }),
      {
        status: 404,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }
  return new Response(JSON.stringify(post), {
    headers: {
      'content-type': 'application/json'
    }
  });
};

// POST /api/posts/[slug] - Create a new post simulation
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  return new Response(JSON.stringify({ body }), {
    status: 201,
    headers: {
      'content-type': 'application/json'
    }
  });
};

// PUT /api/posts/[slug] - Update a post simulation
export const PUT: APIRoute = async ({ params, request }) => {
  const { slug } = params;
  const body = await request.json();
  return new Response(JSON.stringify({ slug, body }), {
    headers: {
      'content-type': 'application/json'
    }
  });
};

// DELETE /api/posts/[slug] - Delete a post simulation
export const DELETE: APIRoute = async ({ params }) => {
  const { slug } = params;
  return new Response(JSON.stringify({ slug }), {
    headers: {
      'content-type': 'application/json'
    }
  });
};
