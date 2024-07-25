/// <reference path="node_modules/webpack-dev-server/types/lib/Server.d.ts"/>
import { globSync } from "glob";
import { dirname, relative, resolve } from "path";
import { Configuration, DefinePlugin } from "webpack";

const entries = globSync("./src/modules/!(_*)/**/index.{jsx,tsx}").map(entryPath => [dirname(relative("./src/modules", entryPath)), `./${entryPath}`]);

const getConfig = (env: any): Configuration => ({
  mode: "production",
  entry: Object.fromEntries(entries),
  devServer: {
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    host: "localhost",
    hot: false,
    client: {
      overlay: false,
    },
    webSocketServer: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: false,
                exportLocalsConvention: "as-is",
              },
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
    extensions: [".tsx", ".ts", ".js"],
    fallback: { https: false },
  },
  plugins: [
    new DefinePlugin({
      BUILD_FOR_PORTAL_ASSET: JSON.stringify(env.buildforportalasset),
    }),
  ],
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dist"),
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
});

export default getConfig;
