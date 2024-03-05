import { Button } from "@lifesg/react-design-system/button";
import { Color } from "@lifesg/react-design-system/color";
import { ChevronLeftIcon } from "@lifesg/react-icons/chevron-left";
import { Text } from "@lifesg/react-design-system/text";
import styled from "styled-components";

// =============================================================================
// STYLE INTERFACES
// =============================================================================
interface IIconStyleProps {
    $isCollapsed: boolean;
}

// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div`
    height: 5.75rem;
    display: flex;
    align-items: center;
    padding: 2rem 2rem 2rem 1rem;
    border-bottom: 1px solid ${Color.Neutral[5]};
`;

export const HeaderIcon = styled(ChevronLeftIcon)<IIconStyleProps>`
    transform: ${({ $isCollapsed }) =>
        $isCollapsed ? "rotate(-180deg)" : "rotate(0)"};
    transition: transform 0.3s ease-in-out;
`;

export const HeaderLabel = styled(Text.H3)`
    margin-left: 1rem;
`;

export const SaveChangesButton = styled(Button.Small)`
    margin-left: auto;
`;
