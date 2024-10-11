import { Color } from "@lifesg/react-design-system/color";
import { MediaQuery } from "@lifesg/react-design-system/media";
import { Transition } from "@lifesg/react-design-system/transition";
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
    width: ${({ $narrow }) => ($narrow ? "36.8rem" : "31.2rem")};
    transition: ${Transition.Base};
    background: ${Color.Neutral[8]};
    border-left: 1px solid ${Color.Neutral[5]};
    margin-left: auto;
    box-shadow: 0px 2px 12px 0px rgba(104, 104, 104, 0.25);
    position: fixed;
    top: ${(props) => props.$offset}rem;
    left: 0;
    transform: translateX(0);

    ${MediaQuery.MaxWidth.desktopM} {
        width: ${({ $narrow }) => ($narrow ? "30rem" : "24.4rem")};
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
