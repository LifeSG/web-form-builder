import { Color } from "@lifesg/react-design-system/color";
import { MediaQuery } from "@lifesg/react-design-system/media";
import { Transition } from "@lifesg/react-design-system/transition";
import { ChevronLeftIcon } from "@lifesg/react-icons/chevron-left";
import styled from "styled-components";

// =============================================================================
// STYLING INTERFACE
// =============================================================================
export interface IWrapperStyleProps {
    $isCollapsed: boolean;
}

export interface IHeaderStyleProps {
    $isCollapsed: boolean;
}

// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div<IWrapperStyleProps>`
    height: 100%;
    width: 36.9rem;
    transform: ${({ $isCollapsed }) => $isCollapsed && "translateX(85%)"};
    transition: ${Transition.Base};
    background: ${Color.Neutral[8]};
    border-left: 1px solid ${Color.Neutral[5]};
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0px 2px 12px 0px rgba(104, 104, 104, 0.25);

    ${MediaQuery.MaxWidth.desktopM} {
        width: 40vw;
    }
`;

export const HeaderWrapper = styled.div`
    grid-column: 2 / span 1;
    max-height: 5.75rem;
    display: flex;
    align-items: center;
    width: auto;
    gap: 2rem;
    padding: 2rem;
    border-bottom: 1px solid ${Color.Neutral[5]};
`;

export const ContentWrapper = styled.div`
    display: flex;
    gap: 1rem;
    height: 100%;
`;

export const BasePanelBody = styled.div`
    padding: 2rem 2rem 0 0;
    flex: 1;
`;

export const BasePanelContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: scroll;
`;

export const HeaderIcon = styled(ChevronLeftIcon)<IHeaderStyleProps>`
    transform-origin: bottom-left;
    transform: ${({ $isCollapsed }) =>
        $isCollapsed ? "rotate(-180deg)" : "rotate(0)"};
    transition: transform 0.1s ease-in-out;
`;
