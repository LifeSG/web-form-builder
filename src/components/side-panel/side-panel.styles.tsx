import { Color } from "@lifesg/react-design-system/color";
import { MediaQuery } from "@lifesg/react-design-system/media";
import { Transition } from "@lifesg/react-design-system/transition";
import styled from "styled-components";

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
    width: ${({ $isCollapsed }) => ($isCollapsed ? 5.5 : 36.9)}rem;
    /* transform: ${({ $isCollapsed }) =>
        $isCollapsed && "translateX(calc(100% - 5.5rem))"}; */
    transition: ${Transition.Base};
    background: ${Color.Neutral[8]};
    border-left: 1px solid ${Color.Neutral[5]};
    margin-left: auto;
    box-shadow: 0px 2px 12px 0px rgba(104, 104, 104, 0.25);
    position: sticky;
    top: 0;
    right: 0;

    ${MediaQuery.MaxWidth.desktopM} {
        width: 40vw;
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    height: 100%;
`;

export const ContentSection = styled.div`
    padding: 2rem;
    flex: 1;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
`;
