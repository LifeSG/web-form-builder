import { BaseTheme } from "@lifesg/react-design-system/theme";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { ThemeProvider } from "styled-components";

const preview = {
    decorators: [
        withThemeFromJSXProvider({
            themes: {
                LifeSG: BaseTheme,
            },
            Provider: ThemeProvider,
        }),
    ],
    parameters: {
        actions: { disable: true },
        controls: { disable: true },
        layout: "fullscreen",
        viewport: {
            viewports: INITIAL_VIEWPORTS,
        },
    },
};

export default preview;
