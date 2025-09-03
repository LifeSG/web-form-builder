import { Border, Colour, Radius } from "@lifesg/react-design-system/theme";
import styled from "styled-components";

// =============================================================================
// STYLE INTERFACES
// =============================================================================
export interface IModeButtonProps {
    $active: boolean;
}

// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div`
    height: 100%;
    background: ${Colour.bg};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    padding: 2rem 1rem;
    border-left: ${Border["width-010"]} ${Border.solid} ${Colour.border};
    gap: 2rem;
`;

export const ModeButton = styled.button<IModeButtonProps>`
    background: ${({ $active }) =>
        $active ? Colour["bg-selected-strong"] : "transparent"};
    color: ${Colour["text-primary"]};
    display: grid;
    cursor: pointer;
    border: none;
    border-radius: ${Radius.xs};
    padding: 1rem;

    &:hover {
        background: ${Colour["bg-hover-strong"]};
    }

    &:focus {
        outline-color: ${Colour["border-focus-strong"]};
    }

    svg {
        width: 1.625rem;
        height: 1.625rem;
    }
`;
