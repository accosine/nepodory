const getSlugObj = (params) => {
  const [root, sub] = params;
  if (root && sub) {
    // return the slug for a paginated category
    return { params: { slug: [root, sub] } };
  }
  if (sub) {
    // return the slug for a pagination of all items
    return { params: { slug: [sub] } };
  }
  console.error(new Error("No proper slug params received"));
};
