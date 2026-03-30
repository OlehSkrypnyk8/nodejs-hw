import createHttpError from "http-errors";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof createHttpError.HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd ? "Internal Server Error" : err.stack,
  });
};