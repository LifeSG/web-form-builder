import { Button } from "@lifesg/react-design-system/button";
import { V2_Color } from "@lifesg/react-design-system/v2_color";
import { V2_Text } from "@lifesg/react-design-system/v2_text";
import { ChevronRightIcon } from "@lifesg/react-icons/chevron-right";
import styled, { css } from "styled-components";

// =============================================================================
// STYLE INTERFACES
// =============================================================================
interface IWrapperStyleProps {
    $showDivider: boolean;
}

interface IIconStyleProps {
    $isCollapsed: boolean;
}

// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div<IWrapperStyleProps>`
    height: 5.75rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem 2rem 2rem;
    border-bottom: ${({ $showDivider }) =>
        $showDivider ? css`1px solid ${V2_Color.Neutral[5]}` : "none"};
`;

export const HeaderChevronIcon = styled(ChevronRightIcon)<IIconStyleProps>`
    transform: ${({ $isCollapsed }) =>
        $isCollapsed ? "rotate(-180deg)" : "rotate(0)"};
    transition: transform 350ms ease-in-out;
`;

export const HeaderLabel = styled(V2_Text.H3)`
    margin-right: 1rem;
`;

export const SaveChangesButton = styled(Button.Small)`
    margin-left: auto;
    margin-right: 1rem;
`;
