module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'module:react-native-dotenv',
      ["module-resolver",
        {
          "root": "./",
          "extensiosn": [
            ".ts",
            ".tsx"
          ],
          "alias": {
            "@app/api": "./shared/api",
            "@app/builders": "./shared/utils/builders",
            "@app/converters": "./shared/utils/converters",
            "@app/data": "./shared/utils/data",
            "@app/hooks": "./shared/utils/hooks",
            "@app/components": "./shared/components",
            "@app/features": "./features"
          }
        }
      ]
    ],
  };
};
