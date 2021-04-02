const fs = require("fs");
const getAll = require("../automat/getAll");
const { episodesDirectory, publicDirectory } = require("../configuration");

export const generateEpisodeItem = (ep) => {
  const {
    date,
    title,
    content,
    guid,
    episode,
    duration,
    bitlength,
    subtitle,
    configuration: { feedMarketingLinkMarkup, publisher },
  } = ep;

  // Remove all line breaking spaces for inlining within xml feed
  const nbspContent = content.replace(/(\r\n|\n|\r)/gm, "");

  return `<item>
      <pubDate>${date.toUTCString()}</pubDate>
      <title>${title}</title>
      <description>${nbspContent}</description>
      <content:encoded><![CDATA[<p>${nbspContent} - ${feedMarketingLinkMarkup}</p>]]></content:encoded>
      <guid>${guid}</guid>
      <enclosure url="${episode}" type="audio/mpeg" length="${bitlength}"/>
      <itunes:duration xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">${duration}</itunes:duration>
      <itunes:author xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">${publisher}</itunes:author>
      <itunes:subtitle xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">${subtitle}</itunes:subtitle>
    </item>
    `;
};

export const generatePodcastFeed = ({
  protocol,
  domain,
  name,
  email,
  publisher,
  description,
  language,
  image,
  keywords,
  category,
  subcategory1,
  subcategory2,
  year,
  buildDate,
  episodesWithConfig,
}) => `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
  <channel>
    <atom:link href="${protocol}://${domain}/podcasts.xml" rel="self" type="application/rss+xml"/>
    <itunes:owner>
      <itunes:name>${name}</itunes:name>
      <itunes:email>${email}</itunes:email>
    </itunes:owner>
    <title>${name}</title>
    <googleplay:author>${publisher}</googleplay:author>
    <description>${description}</description>
    <itunes:image href="${image}"/>
    <copyright>© ${year} ${publisher}</copyright>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <generator>next.js</generator>
    <language>${language}</language>
    <link>${protocol}://${domain}</link>
    <itunes:keywords xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">${keywords}</itunes:keywords>
    <itunes:block>no</itunes:block>
    <itunes:author>${publisher}</itunes:author>
    <itunes:category text="${category}"/>
    <itunes:category text="${category}">
      <itunes:category text="${subcategory1}"/>
    </itunes:category>
    <itunes:category text="${category}">
      <itunes:category text="${subcategory2}"/>
    </itunes:category>
    <itunes:block>no</itunes:block>
    <itunes:explicit>yes</itunes:explicit>
    <ttl>60</ttl>
    ${episodesWithConfig.map(generateEpisodeItem).join("")}
  </channel>
</rss>`;

export const addConfig = (episode) => {
  const feedMarketingLinkMarkup = process.env.PODCAST_MARKETING_LINKMARKUP;
  const publisher = process.env.PODCAST_PUBLISHER;
  const date = new Date(episode.date + ":00.000Z");

  return {
    ...episode,
    date,
    configuration: {
      feedMarketingLinkMarkup,
      publisher,
    },
  };
};

(async () => {
  const episodes = getAll(
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

  const episodeDates = episodes
    .map((episode) => episode.date)
    .sort((date1, date2) => (date1 > date2 ? "-1" : "1"));
  const [mostRecentDate, ...rest] = episodeDates;

  const settings = {
    protocol: process.env.PROTOCOL,
    domain: process.env.DOMAIN,
    name: process.env.PODCAST_NAME,
    email: process.env.PODCAST_EMAIL,
    publisher: process.env.PODCAST_PUBLISHER,
    description: process.env.PODCAST_DESCRIPTION,
    language: process.env.PODCAST_LANGUAGE,
    image: process.env.PODCAST_IMAGE,
    keywords: process.env.PODCAST_KEYWORDS,
    category: process.env.PODCAST_CATEGORY,
    subcategory1: process.env.PODCAST_SUBCATEGORY1,
    subcategory2: process.env.PODCAST_SUBCATEGORY2,
    year: new Date().getFullYear(),
    buildDate: new Date(mostRecentDate).toUTCString(),
    episodesWithConfig: episodes.map(addConfig),
  };

  const sitemap = generatePodcastFeed(settings);

  fs.writeFileSync(`${publicDirectory}/podcast.xml`, sitemap);
})();
