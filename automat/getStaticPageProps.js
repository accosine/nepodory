import configuration, { postsPerPage, pagesDirectory } from "../configuration";
import getAll from "./getAll";
import getBySlug from "./getBySlug";

export const getStaticProps = async ([slug]) => {
  const pages = getAll(["slug"], pagesDirectory).map((page) => page.slug);

  if (pages.includes(slug)) {
    const post = getBySlug(
      slug || "",
      [
        "audiosnippet",
        "bitlength",
        "date",
        "draft",
        "duration",
        "episode",
        "guid",
        "image",
        "number",
        "poster",
        "subtitle",
        "title",
        "video",
        "content",
      ],

      pagesDirectory
    );
    return {
      props: { ...post, slug, isPage: true, configuration },
    };
  }

  const posts = getAll(
    [
      "audiosnippet",
      "bitlength",
      "date",
      "draft",
      "duration",
      "episode",
      "guid",
      "image",
      "number",
      "poster",
      "subtitle",
      "title",
      "video",
      "content",
    ],
    pagesDirectory
  );

  const pageInt = parseInt(slug, 10);
  const startIndex = (pageInt - 1) * postsPerPage;
  const endIndex = startIndex + parseInt(postsPerPage, 10);
  const prevPosts =
    startIndex + 1 - postsPerPage > 0 ? startIndex + 1 - postsPerPage : null;
  const nextPosts = endIndex >= posts.length ? null : pageInt + 1;
  const evenPagination = posts.length % postsPerPage === 0;
  const sumPaginationPages = posts.length / postsPerPage;
  const lastPosts = evenPagination
    ? sumPaginationPages
    : Math.floor(sumPaginationPages) + 1;

  return {
    props: {
      isPagination: true,
      startIndex,
      endIndex,
      prevPosts,
      nextPosts,
      lastPosts,
      posts: posts.slice(startIndex, endIndex),
      isCategory: true,
      configuration,
    },
  };
};

export default getStaticProps;
