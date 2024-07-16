import { Color } from "@lifesg/react-design-system/color";
import { BinIcon } from "@lifesg/react-icons";
import { DragHandleIcon } from "@lifesg/react-icons/drag-handle";
import styled from "styled-components";

// =============================================================================
// STYLE INTERFACES
// =============================================================================

interface IBinButtonProps {
    $disabled?: boolean;
}

// =============================================================================
// STYLING
// =============================================================================

export const DropdownItemsChildWrapper = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    margin-bottom: 16px;
    & > *:nth-child(1) {
        margin-right: 8px;
    }

    & > *:nth-child(2) {
        margin-right: 16px;
    }

    & > *:nth-child(3) {
        margin-right: 16px;
    }

    & > *:nth-child(4) {
        margin-right: 0;
    }
    & > * {
        margin-bottom: 0 !important;
    }
`;

export const DropdownItemsDragHandleButton = styled.div`
    margin-top: 0.625rem;
    svg {
        color: ${Color.Accent.Light[1]};
        width: 1.25rem;
        height: 1.25rem;
        cursor: grab;
    }
`;

export const StyledBinButton = styled.div<IBinButtonProps>`
    margin-top: 0.625rem;
    svg {
        color: ${({ $disabled }) =>
            $disabled ? Color.Neutral[3] : Color.Accent.Light[1]};
        width: 1.625rem;
        height: 1.625rem;
        cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    }
`;
