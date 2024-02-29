import styled from "styled-components";

interface IconButtonStyleProps {
    $iconSize?: string;
    $iconColor?: (props: any) => string;
}

export const IconButton = styled.button<IconButtonStyleProps>`
    padding: 0;
    border: none;
    display: grid;
    place-items: center;
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
