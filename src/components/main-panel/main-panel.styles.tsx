import { Text } from "@lifesg/react-design-system/text";
import styled from "styled-components";
import {
    expandedElementsWrapperStyles,
    expandedEmptyDisplayGridColumnStyles,
    expandedGridColumnStyles,
    generateElementCardView,
    minimisedElementsWrapperStyles,
    minimisedEmptyDisplayGridColumnStyles,
    minimisedGridColumnStyles,
} from "../common/columns/columns.styles";

// =============================================================================
// STLE INTERFACES
// =============================================================================
interface IWrapperStyleProps {
    $mode: "expanded" | "minimised";
}

interface IElementItemWrapperProps extends IWrapperStyleProps {
    $size: "full" | "left" | "right";
}

// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div<IWrapperStyleProps>`
    position: relative;
    padding-bottom: 8rem;

    ${({ $mode }) => {
        switch ($mode) {
            case "expanded":
                return expandedGridColumnStyles;
            case "minimised":
                return minimisedGridColumnStyles;
        }
    }}
`;

export const EmptyDisplayWrapper = styled.div<IWrapperStyleProps>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 100%;

    ${({ $mode }) => {
        switch ($mode) {
            case "expanded":
                return expandedEmptyDisplayGridColumnStyles;
            case "minimised":
                return minimisedEmptyDisplayGridColumnStyles;
        }
    }}
`;

export const EmptyDisplayTitle = styled(Text.H3)`
    margin-top: 2rem;
`;

export const EmptyDisplayDescription = styled(Text.Body)`
    margin-top: 1rem;
`;

export const ElementsWrapper = styled.ul<IWrapperStyleProps>`
    list-style-type: none;
    display: grid;
    row-gap: 2rem;

    ${({ $mode }) => {
        switch ($mode) {
            case "expanded":
                return expandedElementsWrapperStyles;
            case "minimised":
                return minimisedElementsWrapperStyles;
        }
    }}
`;
export const ElementItemWrapper = styled.li<IElementItemWrapperProps>`
    ${({ $mode, $size }) => generateElementCardView($mode, $size)}
`;
