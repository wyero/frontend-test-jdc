const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://www.emsifa.com/api-wilayah-indonesia/api",
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
