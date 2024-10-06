// DESCRIPTION: logs request to console
export const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`,
  );
  next();
};
