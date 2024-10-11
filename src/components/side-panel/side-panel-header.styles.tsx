import { Button } from "@lifesg/react-design-system/button";
import { Color } from "@lifesg/react-design-system/color";
import { Text } from "@lifesg/react-design-system/text";
import { ChevronRightIcon } from "@lifesg/react-icons/chevron-right";
import styled, { css } from "styled-components";

// =============================================================================
// STYLE INTERFACES
// =============================================================================
interface IIconStyleProps {
    $isCollapsed: boolean;
}

// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div<{ $showDivider: boolean }>`
    height: 5.75rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem 2rem 2rem;
    border-bottom: ${({ $showDivider }) =>
        $showDivider ? css`1px solid ${Color.Neutral[5]}` : "none"};
`;

export const HeaderChevronIcon = styled(ChevronRightIcon)<IIconStyleProps>`
    transform: ${({ $isCollapsed }) =>
        $isCollapsed ? "rotate(-180deg)" : "rotate(0)"};
    transition: transform 350ms ease-in-out;
`;

export const HeaderLabel = styled(Text.H3)`
    margin-right: 1rem;
`;

export const SaveChangesButton = styled(Button.Small)`
    margin-left: auto;
    margin-right: 1rem;
`;
