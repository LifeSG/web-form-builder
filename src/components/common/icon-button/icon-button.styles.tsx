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
    padding: 0;
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
    }
`;
