import { Button } from "@lifesg/react-design-system/button";
import { Color } from "@lifesg/react-design-system/color";
import { MediaQuery } from "@lifesg/react-design-system/media";
import { Text } from "@lifesg/react-design-system/text";
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
    transform: ${({ $isCollapsed }) =>
        $isCollapsed && "translateX(calc(100% - 5.5rem))"};
    transition: ${Transition.Base};
    background: ${Color.Neutral[8]};
    border-left: 1px solid ${Color.Neutral[5]};
    position: sticky;
    top: 0;
    margin-left: auto;
    right: 0;
    box-shadow: 0px 2px 12px 0px rgba(104, 104, 104, 0.25);

    ${MediaQuery.MaxWidth.desktopM} {
        width: 40vw;
    }
`;

export const HeaderWrapper = styled.div`
    height: 5.75rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    border-bottom: 1px solid ${Color.Neutral[5]};
`;

export const HeaderTitle = styled(Text.H3)`
    font-weight: semibold;
`;

export const ContentWrapper = styled.div`
    display: flex;
    gap: 1rem;
    height: 100%;
`;

export const SidePanelBody = styled.div`
    padding: 2rem 2rem 0 0;
    flex: 1;
`;

export const SidePanelContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: scroll;
`;

export const HeaderIcon = styled(ChevronLeftIcon)<IHeaderStyleProps>`
    transform: ${({ $isCollapsed }) =>
        $isCollapsed ? "rotate(-180deg)" : "rotate(0)"};
    transition: transform 0.3s ease-in-out;
`;

export const SaveChangesButton = styled(Button.Small)`
    margin-left: auto;
`;
