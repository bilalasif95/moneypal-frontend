
var API = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL + "/"
  : "https://staging-moneypal-backend.rnssol.com";

module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "liveChat",
      externals: {
        react: "React",
      },
    },
  },
  devServer: {
    compress: true,
    disableHostCheck: true,
  },
  webpack: {
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(API)
    }
  },
};
