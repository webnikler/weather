module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'module:react-native-dotenv',
      ["babel-plugin-module-resolver",
        {
          "root": "./",
          "alias": {
            "@api": "./core/api",
            "@builders": "./core/utils/builders",
            "@converters": "./core/utils/converters",
            "@data": "./core/utils/data",
            "@hooks": "./core/utils/hooks",
            "@features": "./features"
          }
        }
      ]
    ],
  };
};
