const fs = require("fs");
const globby = require("globby");

(async () => {
  const globs = await globby(["mdx/posts/*.mdx", "mdx/pages/*.mdx"]);
  const protocol = process.env.PROTOCOL;
  const domain = process.env.DOMAIN;
  const articlePath = process.env.ARTICLEPATH;
  const paths = globs.map((glob) =>
    glob
      .replace("mdx/pages/", "")
      .replace("mdx/posts/", `${articlePath}/`)
      .replace(".mdx", "")
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${protocol}://${domain}</loc>
    </url>
    ${paths
      .map((slug) => {
        return `
    <url>
      <loc>${`${protocol}://${domain}/${slug}`}</loc>
    </url>`;
      })
      .join("")}
  </urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
})();
