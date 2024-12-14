import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  if (slug) {
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
  }

  const posts = await getCollection('blog');

  return new Response(
    JSON.stringify(
      posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        updatedDate: post.data.updatedDate,
        heroImage: post.data.heroImage,
        url: post.id
      }))
    ),
    {
      headers: {
        'content-type': 'application/json'
      }
    }
  );
};
