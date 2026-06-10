export const getBaseURL = () => {
  const env = process.env.NODE_ENV;

  const baseURL =
    env === "development" ? "http://localhost3000" : "http://domain.com";

  return baseURL;
};
