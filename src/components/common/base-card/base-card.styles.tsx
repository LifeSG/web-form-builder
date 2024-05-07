import { Color } from "@lifesg/react-design-system/color";
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
                  border: 1px solid ${Color.Primary};
                  background: ${Color.Accent.Light[5]};
              `
            : css`
                  border: 1px solid transparent;
              `}

    :hover {
        border-color: ${Color.Primary};
        box-shadow: 0px 2px 8px 0px ${Color.Shadow.Accent};
    }

    :focus {
        outline-color: ${Color.Primary};
    }
`;
