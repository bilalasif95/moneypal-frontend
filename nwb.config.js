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
};
