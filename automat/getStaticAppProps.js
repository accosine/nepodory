import getStaticHomeProps from "./getStaticHomeProps";
import getStaticPageProps from "./getStaticPageProps";

export const getStaticProps = (props) => {
  const { params } = props;
  const { slug } = params;
  switch (!!slug ? slug.length : undefined) {
    case undefined:
      return getStaticHomeProps();
      break;
    case 1:
      return getStaticPageProps(slug);
      break;
    default:
      console.log("this is the default 💩", slug, slug.length);
  }
};
