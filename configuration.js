// BEWARE: Don't use JS module syntax yet, next.js will not compile
const { join } = require("path");

const generateConfiguration = (() => {
  const configuration = {};
  const defaultValues = {
    attachmentColor: process.env.ATTACHMENT_COLOR,
    backgroundColor: process.env.BACKGROUND_COLOR,
    coverImage: process.env.COVER_IMAGE,
    coverVideo: process.env.COVER_VIDEO,
    domain: process.env.DOMAIN,
    episodesDirectory: process.env.FOLDER_EPISODES
      ? join(process.cwd(), process.env.FOLDER_EPISODES)
      : null,
    hamburger: process.env.HAMBURGER ? process.env.HAMBURGER.split(" ") : null,
    linkColor: process.env.THEME_COLOR_LINK,
    nameMark: process.env.NAME_MARK,
    pagesDirectory: process.env.FOLDER_PAGES
      ? join(process.cwd(), process.env.FOLDER_PAGES)
      : null,
    posterPortrait: process.env.POSTER_PORTRAIT,
    primaryColor: "green",
    protocol: process.env.PROTOCOL,
    publicDirectory: process.env.FOLDER_PUBLIC
      ? join(process.cwd(), process.env.FOLDER_PUBLIC)
      : null,
    publisher: process.env.PODCAST_PUBLISHER,
    publisherLogo: process.env.PODCAST_PUBLISHER_LOGO,
    secondaryColor: "red",
    storyTitle: process.env.STORY_TITLE,
    tertiaryColor: "blue",
    textColor: process.env.TEXT_COLOR,
    timeFormat: process.env.TIME_FORMAT,
    timeLocale: process.env.TIME_LOCALE,
  };
  const fallbackValues = {
    attachmentColor: "red",
    backgroundColor: "#000",
    coverImage: "",
    coverVideo: "",
    domain: "localhost",
    episodesDirectory: join(process.cwd(), "tests/fixtures/episodes"),
    format: "YYYY-MM-DD",
    hamburger: ["imprint privacy"],
    linkColor: "#ff2a9d",
    locale: "en",
    nameMark: "ACME",
    pagesDirectory: join(process.cwd(), "tests/fixtures/pages"),
    posterPortrait: "",
    protocol: "http",
    publicDirectory: join(process.cwd(), "tests/fixtures/public"),
    publisher: "Publisher Name",
    publisherLogo: "",
    storyTitle: "Story Title",
    textColor: "#fff",
    timeFormat: "YYYY-MM-DD",
    timeLocale: "en",
  };
  const socialMedia = {
    email: {
      name: "Email",
      base: "mailto:",
      handle: process.env.SOCIALMEDIA_EMAIL_HANDLE,
    },
    facebook: {
      name: "Facebook",
      base: "https://www.facebook.com/",
      handle: process.env.SOCIALMEDIA_FACEBOOK_HANDLE,
    },
    github: {
      name: "GitHub",
      base: "https://github.com/",
      handle: process.env.SOCIALMEDIA_GITHUB_HANDLE,
    },
    instagram: {
      name: "Instagram",
      base: "https://www.instagram.com/",
      handle: process.env.SOCIALMEDIA_INSTAGRAM_HANDLE,
    },
    snapchat: {
      name: "Snapchat",
      base: "https://www.snapchat.com/add/",
      handle: process.env.SOCIALMEDIA_SNAPCHAT_HANDLE,
    },
    twitter: {
      name: "Twitter",
      base: "https://www.twitter.com/",
      handle: process.env.SOCIALMEDIA_TWITTER_HANDLE,
    },
    youtube: {
      name: "Youtube",
      base: "https://www.youtube.com/channel/",
      handle: process.env.SOCIALMEDIA_YOUTUBE_HANDLE,
    },
    tiktok: {
      name: "TikTok",
      base: "https://www.tiktok.com/",
      handle: process.env.SOCIALMEDIA_TIKTOK_HANDLE,
    },
  };
  const podcasts = {
    spotify: {
      name: "Spotify",
      show: process.env.PODCAST_AGGREGATOR_SPOTIFY_SHOW,
      image: process.env.PODCAST_AGGREGATOR_SPOTIFY_IMAGE,
    },
    apple: {
      name: "Apple",
      show: process.env.PODCAST_AGGREGATOR_APPLE_SHOW,
      image: process.env.PODCAST_AGGREGATOR_APPLE_IMAGE,
    },
    google: {
      name: "Google",
      show: process.env.PODCAST_AGGREGATOR_GOOGLE_SHOW,
      image: process.env.PODCAST_AGGREGATOR_GOOGLE_IMAGE,
    },
    deezer: {
      name: "Deezer",
      show: process.env.PODCAST_AGGREGATOR_DEEZER_SHOW,
      image: process.env.PODCAST_AGGREGATOR_DEEZER_IMAGE,
    },
    tunein: {
      name: "TuneIn",
      show: process.env.PODCAST_AGGREGATOR_TUNEIN_SHOW,
      image: process.env.PODCAST_AGGREGATOR_TUNEIN_IMAGE,
    },
  };

  configuration.socialmedia = {};
  configuration.podcasts = {};
  // Check whether a value is undefined and fall back to default values if so
  for (const [key, value] of Object.entries(defaultValues)) {
    const isConfKey = defaultValues[key];
    isConfKey
      ? (configuration[key] = value)
      : (configuration[key] = fallbackValues[key]);
  }

  // Check whether a value to be added is undefined and skip it if so
  for (const [key, value] of Object.entries(socialMedia)) {
    const isConfKey = socialMedia[key].handle;
    isConfKey && (configuration.socialmedia[key] = value);
  }
  for (const [key, value] of Object.entries(podcasts)) {
    const isConfShow = podcasts[key].show;
    const isConfImage = podcasts[key].image;
    isConfShow && isConfImage && (configuration.podcasts[key] = value);
  }
  return configuration;
})();

module.exports = generateConfiguration;
