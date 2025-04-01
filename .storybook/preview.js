import { LifeSGTheme } from "@lifesg/react-design-system/theme";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { ThemeProvider } from "styled-components";

const preview = {
    decorators: [
        withThemeFromJSXProvider({
            themes: {
                LifeSG: LifeSGTheme,
            },
            Provider: ThemeProvider,
        }),
    ],
    parameters: {
        layout: "fullscreen",
        viewport: {
            viewports: INITIAL_VIEWPORTS,
        },
    },
};

export default preview;
