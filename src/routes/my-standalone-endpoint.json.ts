import type { RequestHandler } from "@sveltejs/kit";

export const post: RequestHandler = async ({ request, url }) => {
  const which = url.searchParams.get('which') as 'json' | 'formData';

  let body;
  switch (which) {
    case 'json':
      try {
        body = await request.json()
      } catch (e) {
        body = { error: (e as Error)?.message };
      }
      return {
        body
      }
    case 'formData':
      try {
        const formData = await request.formData();
        if (formData.has('name')) {
        body = { name: formData.get('name')!.toString() }
        } else {
          body = "{}"
        }
      } catch (e) {
        body = { error: (e as Error)?.message };
      }
      return {
        body
      }
    default:
      throw new Error("What're you doing, you coward?")
  }
}