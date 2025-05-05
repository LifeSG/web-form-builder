import { Border, Colour, Radius } from "@lifesg/react-design-system/theme";
import styled from "styled-components";

// =============================================================================
// STYLE INTERFACES
// =============================================================================

interface IDroppableWrapperProps {
    isOver: boolean;
}

// =============================================================================
// STYLING
// =============================================================================

export const Wrapper = styled.div`
    position: relative;
`;

export const OptionsChildWrapper = styled.div`
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

export const OptionsDragHandleButton = styled.div`
    margin-top: 0.875rem;
    svg {
        color: ${Colour["icon-primary-subtlest"]};
        width: 1.25rem;
        height: 1.25rem;
        align-items: center;
        cursor: grab;
    }
`;

export const DroppableWrapper = styled.div<IDroppableWrapperProps>`
    ${Border.Util["dashed-default"]({
        thickness: Border["width-010"],
        colour: Colour["border-primary"],
        radius: Radius.sm,
    })};
    background-color: ${Colour["bg-primary-subtlest"]};
    position: absolute;
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
    gap: 0.25rem;

    svg {
        color: ${Colour["icon-primary"]};
        height: 2.08rem;
        width: 2.08rem;
    }
`;
