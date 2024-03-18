import { Color } from "@lifesg/react-design-system/color";
import { Text, TextStyleHelper } from "@lifesg/react-design-system/text";
import styled, { css } from "styled-components";

// =============================================================================
// STYLE INTERFACES
// =============================================================================
interface IActionButtonStyleProps {
    $disabled?: boolean;
}

// =============================================================================
// STYLING
// =============================================================================
export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
`;

export const DetailsContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.25rem;
`;

export const IdLabel = styled(Text.XSmall)`
    color: ${Color.Neutral[3]};
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const ActionButton = styled.button<IActionButtonStyleProps>`
    background: transparent;
    cursor: pointer;
    padding: 1rem 0;
    border: none;
    gap: 0.25rem;
    display: flex;
    align-items: center;
    ${TextStyleHelper.getTextStyle("XSmall", "semibold")}

    svg {
        height: 1rem;
        width: 1rem;
    }

    ${({ $disabled }) => {
        if ($disabled) {
            return css`
                color: ${Color.Neutral[3]};
            `;
        } else {
            return css`
                color: ${Color.Primary};
            `;
        }
    }}
`;
