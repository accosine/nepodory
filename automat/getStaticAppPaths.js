import getStaticHomePaths from "./getStaticHomePaths";
import getStaticPagePaths from "./getStaticPagePaths";

export const getStaticPaths = async () => {
  const allPageSlugs = await getStaticPagePaths();
  const { paths: allPagePaths } = allPageSlugs;

  const homeSlug = await getStaticHomePaths();
  const { paths: homePath } = homeSlug;

  return {
    paths: [...homePath, ...allPagePaths, { params: { slug: [""] } }],
    fallback: false,
  };
};

export default getStaticPaths;
