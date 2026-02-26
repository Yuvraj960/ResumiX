export async function GET() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0ea5a4" />
  <text x="50%" y="50%" font-size="32" fill="#ffffff" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif">R</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
