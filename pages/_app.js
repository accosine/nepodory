import Head from "next/head";

function PodcastApp({ Component, pageProps }) {
  const storyTitle = process.env.STORY_TITLE;
  const crawling = process.env.CRAWLING;
  return (
    <>
      <Head>
        <title>{storyTitle}</title>
        <meta name="robots" content={crawling} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default PodcastApp;
