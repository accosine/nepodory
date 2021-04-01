// BEWARE: Don't use JS module syntax yet, next.js will not compile
const { join } = require("path");

const generateConfiguration = (() => {
  const configuration = {};
  const defaultValues = {
    linkColor: process.env.THEME_COLOR_LINK,
    nameMark: process.env.NAME_MARK,
    protocol: process.env.PROTOCOL,
    domain: process.env.DOMAIN,
    timeLocale: process.env.TIME_LOCALE,
    timeFormat: process.env.TIME_FORMAT,
    episodesDirectory: process.env.FOLDER_EPISODES
      ? join(process.cwd(), process.env.FOLDER_EPISODES)
      : null,
    pagesDirectory: process.env.FOLDER_PAGES
      ? join(process.cwd(), process.env.FOLDER_PAGES)
      : null,
    primaryColor: "green",
    secondaryColor: "red",
    tertiaryColor: "blue",
    coverImage: process.env.COVER_IMAGE,
    coverVideo: process.env.COVER_VIDEO,
    backgroundColor: process.env.BACKGROUND_COLOR,
    textColor: process.env.TEXT_COLOR,
    attachmentColor: process.env.ATTACHMENT_COLOR,
    storyTitle: process.env.STORY_TITLE,
    publisher: process.env.PODCAST_PUBLISHER,
    publisherLogo: process.env.PODCAST_PUBLISHER_LOGO,
    posterPortrait: process.env.POSTER_PORTRAIT,
    hamburger: process.env.HAMBURGER ? process.env.HAMBURGER.split(" ") : null,
  };
  const fallbackValues = {
    linkColor: "#ff2a9d",
    nameMark: "ACME",
    locale: "en",
    protocol: "http",
    domain: "localhost",
    format: "YYYY-MM-DD",
    episodesDirectory: join(process.cwd(), "mdx/episodes"),
    pagesDirectory: join(process.cwd(), "mdx/pages"),
    coverImage: "",
    coverVideo: "",
    backgroundColor: "#000",
    textColor: "#fff",
    attachmentColor: "red",
    storyTitle: "Story Title",
    publisher: "Publisher Name",
    publisherLogo: "",
    posterPortrait: "",
    hamburger: ["imprint privacy"],
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
