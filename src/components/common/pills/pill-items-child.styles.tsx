import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";

interface IDroppableWrapperProps {
    isOver: boolean;
}

export const Wrapper = styled.div`
    position: relative;
`;

export const DroppableWrapper = styled.div<IDroppableWrapperProps>`
    border: 1px dashed ${Color.Primary};
    border-radius: 0.25rem;
    background: ${Color.Accent.Light[5]};
    position: absolute;
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
    gap: 0.25rem;

    svg {
        color: ${Color.Primary};
        height: 2.08rem;
        width: 2.08rem;
    }
`;

export const PillFieldsWrapper = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;
    & > *:nth-child(1) {
        margin-right: 0.5rem;
    }
    & > *:nth-child(2) {
        width: 100%;
        margin-right: 1rem;
    }
    & > * {
        margin-bottom: 0 !important;
    }
`;

export const PillDragHandleButton = styled.div`
    margin-top: 0.875rem;
    svg {
        color: ${Color.Accent.Light[1]};
        width: 1.25rem;
        height: 1.25rem;
        align-items: center;
        cursor: grab;
    }
`;
