export const validationRequestTypes = ({ params, query, body }) => {
  return (req, res, next) => {
    const errors = [];
    if (params) {
      params.forEach((key) => {
        if (!req.params[key]) {
          errors.push(`El parámetro ${key} es requerido en params`);
        }
      });
    }
    if (query) {
    
      query.forEach((key) => {
        if (!req.query[key]) {
          errors.push(`El parámetro ${key} es requerido en query`);
        }
      });
    }
    if (body) {
      for (const key in body) {
        if (!req.body[key]) {
          errors.push(`El parámetro ${key} es requerido en body`);
        }
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  };
};
