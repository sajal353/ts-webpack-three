const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    publicPath: "/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true,
    compress: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
    client: {
      reconnect: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".json", ".css", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
      {
        test: /\.tsx$/,
        use: "ts-loader",
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
      {
        test: /.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.(gltf|glb)$/,
        type: "asset/resource",
      },
      {
        test: /\.glsl$/,
        type: "asset/source",
      },
    ],
  },
};
