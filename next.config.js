const withTM = require("next-transpile-modules")(["leitmotif"], {
  unstable_webpack5: true,
});

module.exports = withTM({
  webpack: (config, { isServer }) => {
    // Fixes npm packages (mdx) that depend on `fs` module
    if (!isServer) {
      require("./scripts/generate-sitemap"),
        require("./scripts/generate-podcastfeed"),
        require("./scripts/generate-robotstxt"),
        (config.node = {
          fs: "empty",
        });
    }
    return config;
  },
});
