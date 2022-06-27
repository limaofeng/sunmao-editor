import { configure } from '@storybook/react';

import "../stories/styles/index.less";

const loaderFn = () => {
  const allExports = [
  ];
  return allExports;
};

configure(loaderFn, module);

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  layout: 'fullscreen',
};
