import { V2_Color } from "@lifesg/react-design-system/v2_color";
import styled, { css } from "styled-components";

// =============================================================================
// STYLE INTERFACES
// =============================================================================
interface IBodyStyleProps {
    $focused: boolean;
}

// =============================================================================
// STYLING
// =============================================================================
export const Body = styled.div<IBodyStyleProps>`
    padding: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 8px 0px rgba(104, 104, 104, 0.24);

    ${({ $focused }) =>
        $focused
            ? css`
                  border: 1px solid ${V2_Color.Primary};
                  background: ${V2_Color.Accent.Light[5]};
              `
            : css`
                  border: 1px solid transparent;
              `}

    :hover {
        border-color: ${V2_Color.Primary};
        box-shadow: 0px 2px 8px 0px ${V2_Color.Shadow.Accent};
    }

    :focus {
        outline-color: ${V2_Color.Primary};
    }
`;
