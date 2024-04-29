/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  schema.statics.paginate = async function (filter, options) {
    let sort = "";
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(",").forEach((sortOption) => {
        const [key, order] = sortOption.split(":");
        sortingCriteria.push((order === "desc" ? "-" : "") + key);
      });
      sort = sortingCriteria.join(" ");
    } else {
      sort = "createdAt";
    }

    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10;
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    const excludeFields = options?.excludeFields
      ? options.excludeFields.map((item) => `-${item}`).join(" ")
      : undefined;
    let docsPromise = this.find(filter, excludeFields)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    if (options.populate) {
      for (let query of getPopulateQueries(options.populate)) {
        docsPromise = docsPromise.populate(query);
      }
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const resultsInPage = results.length;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        resultsInPage,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

const getPopulateQueries = (populateString) => {
  const populateArray = [];
  populateString.split(",").forEach((field) => {
    const [entity, path] = field.split(".");
    const existingEntity = populateArray.find((item) => item.path === entity);

    if (existingEntity) {
      existingEntity.select += " " + path;
    } else {
      populateArray.push({ path: entity, select: path });
    }
  });
  return populateArray;
};

module.exports = paginate;
