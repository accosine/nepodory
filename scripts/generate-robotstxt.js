const fs = require("fs");
(async () => {
  const domain = process.env.DOMAIN;
  const protocol = process.env.PROTOCOL;
  const robotstxt = `User-agent: *
Sitemap: ${protocol}://${domain}/sitemap.xml`;
  fs.writeFileSync("public/robots.txt", robotstxt);
})();
