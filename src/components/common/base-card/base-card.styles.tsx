import { Border, Colour, Radius } from "@lifesg/react-design-system/theme";
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
    cursor: pointer;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 8px 0px rgba(104, 104, 104, 0.24);

    ${({ $focused }) =>
        $focused
            ? css`
                  ${Border.Util.solid({
                      thickness: Border["width-010"],
                      colour: Colour["border-focus-strong"],
                  })};
                  background: ${Colour["bg-primary-subtlest"]};
              `
            : css`
                  ${Border.Util.solid({
                      thickness: Border["width-010"],
                      colour: "transparent",
                  })};
              `}

    border-radius: ${Radius.md};

    :hover {
        border-color: ${Colour["border-primary"]};
        box-shadow: 0px 2px 8px 0px ${Colour["border-selected-subtle"]};
    }

    :focus {
        outline-color: ${Colour["border-primary"]};
    }
`;
