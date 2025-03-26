import { V2_Color } from "@lifesg/react-design-system/v2_color";
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
    background: ${V2_Color.Neutral[8]};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    padding: 2rem 1rem;
    border-left: 1px solid ${V2_Color.Neutral[5]};
    gap: 2rem;
`;

export const ModeButton = styled.button<IModeButtonProps>`
    background: ${({ $active }) =>
        $active ? V2_Color.Accent.Light[4] : "transparent"};
    color: ${V2_Color.Primary};
    display: grid;
    cursor: pointer;
    border: none;
    border-radius: 0.25rem;
    padding: 1rem;

    :hover {
        background: ${V2_Color.Accent.Light[4]};
    }

    :focus {
        outline-color: ${V2_Color.Primary};
    }

    svg {
        width: 1.625rem;
        height: 1.625rem;
    }
`;
