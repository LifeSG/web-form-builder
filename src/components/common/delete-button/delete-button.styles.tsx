import { Colour } from "@lifesg/react-design-system/theme";
import styled from "styled-components";

// =============================================================================
// STYLING
// =============================================================================

export const StyledBinButton = styled.button`
    background: none;
    border: none;
    margin-top: 0.625rem;
    svg {
        color: ${({ disabled }) =>
            disabled
                ? Colour["icon-disabled"]
                : Colour["icon-primary-subtlest"]};
        width: 1.625rem;
        height: 1.625rem;
        cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    }
`;
