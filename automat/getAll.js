// BEWARE: Don't use JS module syntax yet, next.js will not compile
const fs = require("fs");
const getBySlug = require("./getBySlug");

// sort items by date in descending order
const sortByDate = (ep1, ep2) => (ep1.date > ep2.date ? "-1" : "1");

module.exports = function getAll(fields = [], dir) {
  const slugs = fs.readdirSync(dir);
  return slugs.map((slug) => getBySlug(slug, fields, dir)).sort(sortByDate);
};
