export default async function getStaticPaths() {
  return {
    paths: [{ params: { slug: [] } }],
    fallback: false,
  };
}
