import styled from "styled-components";

// =============================================================================
// STYLING INTERFACE
// =============================================================================
interface IconButtonStyleProps {
    $iconSize?: string;
    $iconColor?: (props: any) => string;
}

// =============================================================================
// STYLING
// =============================================================================
export const IconButton = styled.button<IconButtonStyleProps>`
    padding: 1rem; // Increase hit zone
    border: none;
    background: transparent;
    cursor: pointer;

    :hover {
        box-shadow: none;
    }

    svg {
        width: ${({ $iconSize }) => $iconSize};
        height: ${({ $iconSize }) => $iconSize};
        color: ${({ $iconColor }) => $iconColor};
        margin-bottom: -5px; // Tweak to align to label
    }
`;
