import getAll from "./getAll";
import { pagesDirectory } from "../configuration";

export const getStaticPaths = async () => {
  const pages = getAll(["slug"], pagesDirectory);

  return {
    paths: pages.map((page) => ({
      params: { slug: [page.slug] },
    })),
    fallback: false,
  };
};
export default getStaticPaths;
