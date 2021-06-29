const path = require("path");
const apiMocker = require("connect-api-mocker");

const mode = process.env.NODE_ENV || "development"; // 기본값을 development로 설정

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    host: "dev.domain.com",
    overlay: true,
    port: 8081,
    stats: "errors-only",
    historyApiFallback: true,
  },
  mode,
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  // eslint-disable-next-line no-dupe-keys
  devServer: {
    overlay: true,
    stats: "errors-only",
    proxy: {
      "/api": "http://localhost:8081", // 프록시
    },
    before: (app) => {
      app.use(apiMocker("api", "mocks/api"));
      // app.get("/api/keywords", (req, res) => {
      //   res.json([
      //     { keyword: "이탈리아" },
      //     { keyword: "세프의요리" },
      //     { keyword: "제철" },
      //     { keyword: "홈파티" },
      //   ]);
      // });
    },
    hot: true,
  },
  optimization: {
    minimizer: mode === "production" ? [new OptimizeCSSAssetsPlugin()] : [],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // style-loader를 앞에 추가한다
      },
      {
        test: /\.png$/, // .png 확장자로 마치는 모든 파일
        loader: "file-loader", // 파일 로더를 적용한다
        options: {
          publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
          name: "[name].[ext]?[hash]", // 파일명 형식
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader", // 바벨 로더를 추가한다
      },
    ],
  },
};
