// Exorcist AI — Cloudflare Worker
// Full implementation in Stage 7.

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/health') {
      return Response.json({ status: 'ok', stage: 'bootstrap' });
    }
    return new Response('Not implemented yet', { status: 501 });
  },
};
