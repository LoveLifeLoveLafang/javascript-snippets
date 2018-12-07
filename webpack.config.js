module.exports = {
  entry: {
    index: "./js/index",
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist"
  }
};
