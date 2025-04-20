import { MediaQuery } from "@lifesg/react-design-system/theme";
import { FormBuilderMediaQuery } from "src/data";
import { css } from "styled-components";

// =========================================================================
// CONST
// =========================================================================
const ELEMENT_CARD_SIZE_MAP = {
    expanded: {
        right: {
            default: "4 / span 3",
            "2xl": "5 / span 4",
            xl: "4 / span 3",
        },
        left: {
            default: "1 / span 3",
            "2xl": "1 / span 4",
            xl: "1 / span 3",
        },
        full: {
            default: "1 / span 6",
            "2xl": "1 / span 8",
            xl: "1 / span 6",
        },
    },
    minimised: {
        right: {
            default: "4 / span 3",
            xl: "3 / span 2",
        },
        left: {
            default: "1 / span 3",
            xl: "1 / span 2",
        },
        full: {
            default: "1 / span 6",
            xl: "1 / span 4",
        },
    },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const generateGridColumn = (breakpoints: { [key: string]: string }) => css`
    ${Object.entries(breakpoints).map(([key, value]) => {
        switch (key) {
            case "2xl":
                return css`
                    ${FormBuilderMediaQuery.MaxWidth["2xl"]} {
                        grid-column: ${value};
                    }
                `;
            case "xl":
                return css`
                    ${MediaQuery.MaxWidth[key]} {
                        grid-column: ${value};
                    }
                `;
            default:
                return css`
                    grid-column: ${value};
                `;
        }
    })}
`;

export const generateElementCardView = (
    size: "left" | "right" | "full",
    mode: "expanded" | "minimised" = "expanded"
) => {
    return generateGridColumn(ELEMENT_CARD_SIZE_MAP[mode][size]);
};
