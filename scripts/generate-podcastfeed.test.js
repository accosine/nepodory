import {
  addConfig,
  generateEpisodeItem,
  generatePodcastFeed,
} from "./generate-podcastfeed";

describe("generate-podcastfeed", () => {
  const singleEpisodeSetting = {
    bitlength: "0000000000",
    date: "Sun, 21 Feb 2021 19:15:00 GMT",
    duration: "00:13:37",
    episode: "https://example.com",
    guid: "0000000000000000000",
    number: "01",
    poster: "example.jpg",
    subtitle: "I am a subtitle",
    title: "I am a title",
    video: "example.mp4",
    content: "I am some content\n",
    configuration: {
      feedMarketingLinkMarkup: "Just some marketing bla bla",
      publisher: "ACME",
    },
  };
  const settings = {
    protocol: "https://",
    domain: "example.com",
    name: "Example",
    email: "hello@example.com",
    publisher: "ACME",
    description: "I am a description",
    language: "en",
    image: "example.jpg",
    keywords: "podcast",
    category: "category",
    subcategory1: "subcategory1",
    subcategory2: "subcategory2",
    year: new Date("June 12, 1929 01:00:00").getFullYear(),
    buildDate: new Date("June 12, 1929 01:00:00").toUTCString(),
    episodesWithConfig: [singleEpisodeSetting].map(addConfig),
  };

  it("adds environment variables to the config", () => {
    const feedMarketingLinkMarkup =
      "<p>The young are not afraid of telling the truth.</p>";
    const folderEpisodes = "mdx/episodes";
    const publisher = "ACME";
    const date = "Wed, 12 Jun 1929 00:00:00 GMT";
    process.env.FOLDER_EPISODES = folderEpisodes;
    process.env.PODCAST_MARKETING_LINKMARKUP = feedMarketingLinkMarkup;
    process.env.PODCAST_PUBLISHER = publisher;
    const config = addConfig({ date: "1929-06-12T01:00" });

    expect(config).toEqual({
      configuration: {
        feedMarketingLinkMarkup,
        publisher,
      },
      date,
    });
  });

  it("generated a piece of xml for the episode in the podcast feed", () => {
    const singleEpisode = generateEpisodeItem(singleEpisodeSetting);
    expect(singleEpisode).toMatchSnapshot();
  });

  it("generated a podcast xml feed", () => {
    expect(generatePodcastFeed(settings)).toMatchSnapshot();
  });
});
