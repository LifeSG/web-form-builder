import { Colour } from "@lifesg/react-design-system/theme";
import { MediaQuery } from "@lifesg/react-design-system/theme";
import styled, { css } from "styled-components";

// =============================================================================
// STYLING INTERFACE
// =============================================================================
export interface IWrapperStyleProps {
    $minimised: boolean;
    $offset: number;
    $narrow: boolean;
}

export interface IContentSectionStyleProps {
    $minimised: boolean;
    $isFocusedElement: boolean;
}
// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div<IWrapperStyleProps>`
    display: flex;
    flex-direction: column;
    height: calc(100% - ${(props) => props.$offset}rem);
    width: ${({ $narrow }) => ($narrow ? "31.2rem" : "36.8rem")};
    transition: all 300ms cubic-bezier(0.21, 0.79, 0.53, 1);
    background: ${Colour.bg};
    border-left: 1px solid ${Colour.border};
    margin-left: auto;
    box-shadow: 0px 2px 12px 0px rgba(104, 104, 104, 0.25);
    position: fixed;
    top: ${(props) => props.$offset}rem;
    left: 0;
    transform: translateX(0);

    ${MediaQuery.MaxWidth.xl} {
        width: ${({ $narrow }) => ($narrow ? "24.4rem" : "30rem")};
    }

    ${(props) => {
        if (props.$minimised) {
            return css`
                transform: translateX(calc(-100% + 5.5rem));
            `;
        }
    }}
`;

export const ContentWrapper = styled.div`
    display: flex;
    height: 100%;
    overflow: hidden;
`;

export const ContentSection = styled.div<IContentSectionStyleProps>`
    padding: ${({ $isFocusedElement, $minimised }) => {
        if ($isFocusedElement) {
            return "1rem";
        }
        return $minimised ? "2rem 6rem 2rem 2rem" : "2rem";
    }};

    flex: 1;
    overflow-y: ${({ $minimised }) => (!$minimised ? "auto" : "hidden")};
    display: flex;
    flex-direction: column;
    height: 100%;
`;
