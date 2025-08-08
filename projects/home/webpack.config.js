const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const webpack = require("webpack");
const dotenv = require("dotenv").config(); // Carga el archivo .env

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "home",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

        // For remotes (please adjust)
        name: "home",
        filename: "remoteEntry.js",
        exposes: {
            './Module': './projects/home/src/app/remote-entry/remote-entry.module.ts',
        },        
        
        // For hosts (please adjust)
        // remotes: {
        //     "demo": "http://localhost:4200/remoteEntry.js",
        //     "shell": "http://localhost:4200/remoteEntry.js",
        //     "auth": "http://localhost:4201/remoteEntry.js",

        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/store": { singleton: true, strictVersion: true, requiredVersion: '14.3.3' },
          "@ngrx/effects": { singleton: true, strictVersion: true, requiredVersion: '14.3.3' },

          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
    })
  ],
};
