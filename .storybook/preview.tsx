import "../packages/gilak-stylist/src/index.scss";
import "../apps/demo/src/styles/index.scss";

import type { Decorator, Preview } from "@storybook/react";
import React from "react";

const withProviders: Decorator = (Story, context) => (
  <Story {...context.args} />
);

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
