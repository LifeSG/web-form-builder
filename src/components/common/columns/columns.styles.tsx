import { MediaQuery } from "@lifesg/react-design-system/media";
import { css } from "styled-components";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const generateGridColumn = (breakpoints: { [key: string]: string }) => css`
    ${Object.entries(breakpoints).map(
        ([key, value]) =>
            `${MediaQuery.MaxWidth[key]} { grid-column: ${value}; }`
    )}
`;

const generateDroppableGridColumn = ($size: string) => {
    const sizeMap = {
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
    };
    return sizeMap[$size]
        ? generateGridColumn(sizeMap[$size])
        : "grid-column: 1 / span 3;";
};

// =============================================================================
// STYLES
// =============================================================================

export const generateElementCardView = ($mode: string, $size: string) => {
    if ($mode === "expanded") {
        return generateDroppableGridColumn($size);
    }

    const sizeMap = {
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
    };

    return sizeMap[$size]
        ? generateGridColumn(sizeMap[$size])
        : "grid-column: 1 / span 3;";
};

export const generateDroppableView = ($size: string) => {
    const sizeMap = {
        right: "4 / span 3",
        left: "1 / span 3",
        full: "1 / span 6",
    };
    return generateGridColumn({
        desktop4k: sizeMap[$size] || "1 / span 3",
        desktopL: sizeMap[$size === "full" ? "full" : "right"] || "1 / span 4",
        tablet: sizeMap[$size] || "1 / span 3",
    });
};
