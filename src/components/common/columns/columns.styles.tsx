import { MediaQuery } from "@lifesg/react-design-system/theme";
import { css } from "styled-components";

// =========================================================================
// CONST
// =========================================================================
const ELEMENT_CARD_SIZE_MAP = {
    expanded: {
        right: {
            xxl: "4 / span 3",
            xl: "5 / span 4",
            lg: "4 / span 3",
        },
        left: {
            xxl: "1 / span 3",
            xl: "1 / span 4",
            lg: "1 / span 3",
        },
        full: {
            xxl: "1 / span 6",
            xl: "1 / span 8",
            lg: "1 / span 6",
        },
    },
    minimised: {
        right: {
            xxl: "4 / span 3",
            lg: "4 / span 2",
        },
        left: {
            xxl: "1 / span 3",
            lg: "1 / span 2",
        },
        full: {
            xxl: "1 / span 6",
            lg: "1 / span 4",
        },
    },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const generateGridColumn = (breakpoints: { [key: string]: string }) => css`
    ${Object.entries(breakpoints).map(([key, value]) => {
        if (key !== "xxl") {
            return css`
                ${MediaQuery.MaxWidth[key]} {
                    grid-column: ${value};
                }
            `;
        }
        return css`
            ${MediaQuery.MinWidth.xxl} {
                grid-column: ${value};
            }
        `;
    })}
`;

export const generateElementCardView = (
    size: "left" | "right" | "full",
    mode: "expanded" | "minimised" = "expanded"
) => {
    return generateGridColumn(ELEMENT_CARD_SIZE_MAP[mode][size]);
};
