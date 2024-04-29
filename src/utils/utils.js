const getParam = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      let value = object[key];
      if (value.includes('~')) {
        value = new RegExp(value.replaceAll('~', ''), 'i');
      }
      obj[key] = value;
    }
    return obj;
  }, {});
};

const getPaginateParams = (req, attributes) => {
  return {
    filters: getParam(req.query, attributes),
    options: getParam(req.query, ["sortBy", "limit", "page"])
  };
};

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = { getParam, getPaginateParams, catchAsync };
