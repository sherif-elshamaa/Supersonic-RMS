const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "https://supersonicapi.herokuapp.com"
    : "https://supersonicapi.herokuapp.com";

module.exports = baseUrl;