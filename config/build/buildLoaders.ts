import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const {isDev} = options

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack']
    }

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    esModule: true,
                    modules: {
                        namedExport: false,
                        auto: (resPath:string) => Boolean(resPath.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]'
                            : '[hash:base64:8]'
                    }
                }
            },
            "sass-loader"
        ]
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    }

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    return [
        fileLoader,
        svgLoader,
        typescriptLoader,
        cssLoader
    ]
}