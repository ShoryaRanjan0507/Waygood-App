const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  resolver: {
    blockList: [
      /.*\/android\/.*/,
      /.*\\android\\.*/,
      /.*\/ios\/.*/,
      /.*\\ios\\.*/
    ]
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
