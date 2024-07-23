import { MediaQuery } from "@lifesg/react-design-system/media";
import { css } from "styled-components";

// =========================================================================
// CONST
// =========================================================================
const ELEMENT_CARD_SIZE_MAP = {
    expanded: {
        right: {
            desktop4k: "4 / span 3",
            desktopL: "4 / span 4",
            tablet: "4 / span 3",
        },
        left: {
            desktop4k: "1 / span 3",
            desktopL: "1 / span 4",
            tablet: "1 / span 3",
        },
        full: {
            desktop4k: "1 / span 6",
            desktopL: "1 / span 8",
            tablet: "1 / span 6",
        },
    },
    minimised: {
        right: {
            desktop4k: "4 / span 3",
            tablet: "4 / span 2",
        },
        left: {
            desktop4k: "1 / span 3",
            tablet: "1 / span 2",
        },
        full: {
            desktop4k: "1 / span 6",
            tablet: "1 / span 4",
        },
    },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const generateGridColumn = (breakpoints: { [key: string]: string }) => css`
    ${Object.entries(breakpoints).map(
        ([key, value]) =>
            `${MediaQuery.MaxWidth[key]} { grid-column: ${value}; }`
    )}
`;

export const generateElementCardView = (
    size: "left" | "right" | "full",
    mode: "expanded" | "minimised" = "expanded"
) => {
    return generateGridColumn(ELEMENT_CARD_SIZE_MAP[mode][size]);
};
