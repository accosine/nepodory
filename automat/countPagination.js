const countPagination = (documentCollection, pageLimit) => {
  return Math.ceil(documentCollection.length / pageLimit);
};
