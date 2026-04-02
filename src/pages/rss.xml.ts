import type { APIRoute } from "astro";
import { getEmDashCollection } from "emdash";

const siteTitle = "Projectflow";

export const GET: APIRoute = async ({ url }) => {
	const siteUrl = url.origin;
	const { entries: pages } = await getEmDashCollection("pages", {
		orderBy: { published_at: "desc" },
		limit: 20,
	});

	const items = pages
		.filter((p) => p.data.publishedAt)
		.map((page) => {
			const pageUrl = `${siteUrl}/pages/${page.id}`;
			return `    <item>
      <title>${escapeXml(page.data.title)}</title>
      <link>${pageUrl}</link>
      <guid isPermaLink="true">${pageUrl}</guid>
      <pubDate>${page.data.publishedAt!.toUTCString()}</pubDate>
    </item>`;
		})
		.join("\n");

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`,
		{
			headers: {
				"Content-Type": "application/rss+xml; charset=utf-8",
				"Cache-Control": "public, max-age=3600",
			},
		},
	);
};

function escapeXml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
