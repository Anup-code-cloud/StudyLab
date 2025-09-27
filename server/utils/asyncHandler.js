// src/utils/asyncHandler.js

/**
 * A helper to wrap async route handlers and forward errors to Express error handler.
 * This prevents repetitive try/catch in every route.
 *
 * Usage:
 *   router.get("/", asyncHandler(async (req, res) => { ... }));
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
