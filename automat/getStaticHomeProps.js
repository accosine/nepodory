import configuration, { episodesDirectory } from "../configuration";
import getAll from "./getAll";
export default async function getStaticProps() {
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
    episodesDirectory
  );

  return {
    props: {
      isHomepage: true,
      posts,
      configuration,
    },
  };
}
