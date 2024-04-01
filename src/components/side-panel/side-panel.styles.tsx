import { Color } from "@lifesg/react-design-system/color";
import { MediaQuery } from "@lifesg/react-design-system/media";
import { Transition } from "@lifesg/react-design-system/transition";
import styled, { css } from "styled-components";

// =============================================================================
// STYLING INTERFACE
// =============================================================================
export interface IWrapperStyleProps {
    $isCollapsed: boolean;
}

// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div<IWrapperStyleProps>`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 36.8rem;
    transition: ${Transition.Base};
    background: ${Color.Neutral[8]};
    border-left: 1px solid ${Color.Neutral[5]};
    margin-left: auto;
    box-shadow: 0px 2px 12px 0px rgba(104, 104, 104, 0.25);
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(0);

    ${MediaQuery.MaxWidth.desktopM} {
        width: 30rem;
    }

    ${(props) => {
        if (props.$isCollapsed) {
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

export const ContentSection = styled.div`
    padding: 2rem;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
`;
