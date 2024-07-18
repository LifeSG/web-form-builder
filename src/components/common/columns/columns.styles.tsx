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

const generateGridTemplateColumns = (breakpoints: {
    [key: string]: string;
}) => css`
    ${Object.entries(breakpoints).map(
        ([key, value]) =>
            `${MediaQuery.MaxWidth[key]} { grid-template-columns: ${value}; }`
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
export const expandedGridColumnStyles = generateGridColumn({
    desktop4k: "4 / span 6",
    desktopL: "3 / span 8",
    desktopM: "3 / span 8",
    tablet: "2 / span 6",
});

export const minimisedGridColumnStyles = generateGridColumn({
    desktop4k: "5 / span 6",
    desktopL: "6 / span 6",
    desktopM: "6 / span 6",
    tablet: "5 / span 4",
});

export const expandedEmptyDisplayGridColumnStyles = generateGridColumn({
    desktop4k: "4 / span 6",
    desktopL: "3 / span 9",
    desktopM: "3 / span 9",
    tablet: "2 / span 7",
});

export const minimisedEmptyDisplayGridColumnStyles = generateGridColumn({
    desktop4k: "5 / span 7",
    desktopL: "6 / span 7",
    desktopM: "6 / span 7",
    tablet: "5 / span 4",
});

export const expandedElementsWrapperStyles = generateGridTemplateColumns({
    desktop4k: "repeat(6, minmax(0, 1fr)); column-gap: 2rem",
    desktopL: "repeat(8, minmax(0, 1fr)); column-gap: 2rem",
    tablet: "repeat(6, minmax(0, 1fr)); column-gap: 1.5rem",
});

export const minimisedElementsWrapperStyles = generateGridTemplateColumns({
    desktop4k: "repeat(6, minmax(0, 1fr)); column-gap: 2rem",
    tablet: "repeat(4, minmax(0, 1fr)); column-gap: 1.5rem",
});

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
