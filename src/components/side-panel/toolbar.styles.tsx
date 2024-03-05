import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";

// =============================================================================
// STYLE INTERFACES
// =============================================================================
export interface IModeButtonProps {
    $active: boolean
}


// =============================================================================
// STYLING
// =============================================================================
export const Wrapper = styled.div`
    height: 100%;
    background: ${Color.Neutral[8]};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    padding: 2rem 1rem;
    border-right: 1px solid ${Color.Neutral[5]};
    gap: 2rem;
`;

export const ModeButton = styled.button<IModeButtonProps>`
    background: ${({ $active }) => $active ? Color.Accent.Light[4] : "transparent"}; 
    color: ${Color.Primary};
    display: grid;
    cursor: pointer;
    border: none;
    border-radius: 0.25rem;
    padding: 1rem;

    &:hover {
        background: ${Color.Accent.Light[4]};
    }

    svg {
        width: 1.625rem;
        height: 1.625rem;
    }
`;
