import Head from "next/head";

function PodcastApp({ Component, pageProps }) {
  const {
    slug,
    configuration: {
      protocol = null,
      domain = null,
      storyTitle = null,
      crawling = null,
    } = {
      protocol: null,
      domain: null,
      storyTitle: null,
      crawling: null,
    },
  } = pageProps;
  const canonical = slug
    ? `${protocol}://${domain}/${slug}`
    : `${protocol}://${domain}`;

  return (
    <>
      {!!protocol && !!domain && (
        <Head>
          <title>{storyTitle}</title>
          <meta name="robots" content={crawling} />
          <link href={canonical} rel="canonical" />
        </Head>
      )}
      <Component {...pageProps} />
    </>
  );
}

export default PodcastApp;
