import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";

// =============================================================================
// STYLING INTERFACE
// =============================================================================
interface IIconButtonStyleProps {
    $iconSize?: string;
    $iconColor?: (props: any) => string;
}

// =============================================================================
// STYLING
// =============================================================================
export const IconButton = styled.button<IIconButtonStyleProps>`
    padding: 1rem; // Increase hit zone
    border: none;
    background: transparent;
    cursor: pointer;

    :hover {
        box-shadow: none;
    }

    :focus {
        outline-color: ${Color.Primary};
    }

    svg {
        width: ${({ $iconSize }) => $iconSize};
        height: ${({ $iconSize }) => $iconSize};
        color: ${({ $iconColor }) => $iconColor};
        margin-bottom: -5px; // Tweak to align to label
    }
`;
