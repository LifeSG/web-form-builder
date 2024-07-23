import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";

// =============================================================================
// STYLING
// =============================================================================

export const DropdownItemsChildWrapper = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    margin-bottom: 1rem;
    & > *:nth-child(1) {
        margin-right: 0.5rem;
    }

    & > *:nth-child(2) {
        margin-right: 1rem;
    }

    & > *:nth-child(3) {
        margin-right: 1rem;
    }

    & > * {
        margin-bottom: 0 !important;
    }
`;

export const DropdownItemsDragHandleButton = styled.div`
    margin-top: 0.875rem;
    svg {
        color: ${Color.Accent.Light[1]};
        width: 1.25rem;
        height: 1.25rem;
        align-items: center;
        cursor: grab;
    }
`;
