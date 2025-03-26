import { V2_Color } from "@lifesg/react-design-system/v2_color";
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
            disabled ? V2_Color.Neutral[3] : V2_Color.Accent.Light[1]};
        width: 1.625rem;
        height: 1.625rem;
        cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    }
`;
