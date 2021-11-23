const postcss = require('rollup-plugin-postcss');
const replace = require('@rollup/plugin-replace');

module.exports = {
  rollup(config, options) {
    config.plugins = config.plugins.map((plugin) => {
      if (plugin && plugin.name === 'replace') {
        return replace({
          preventAssignment: true,
        });
      }
      return plugin;
    });
    config.plugins.push(
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extract: !!options.writeMeta,
      })
    );
    return config;
  },
};
