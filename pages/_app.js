import Head from "next/head";

function PodcastApp({ Component, pageProps }) {
  const { statusCode } = pageProps;
  if (statusCode === "404") {
    return null;
  }
  const {
    slug,
    configuration: { protocol, domain, storyTitle, crawling },
  } = pageProps;
  const canonical = slug
    ? `${protocol}://${domain}/${slug}`
    : `${protocol}://${domain}`;

  return (
    <>
      <Head>
        <title>{storyTitle}</title>
        <meta name="robots" content={crawling} />
        <link href={canonical} rel="canonical" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default PodcastApp;
