export const getJwtSecret = () => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }
  throw new Error("JWT_SECRET is not set in the environment variables");
};
