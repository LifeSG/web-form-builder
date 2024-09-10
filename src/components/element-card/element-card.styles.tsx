import { Color } from "@lifesg/react-design-system/color";
import { Text, TextStyleHelper } from "@lifesg/react-design-system/text";
import { DragHandleIcon } from "@lifesg/react-icons";
import styled, { css } from "styled-components";
import { BaseCard, IProps } from "../common";
import { generateElementCardView } from "../common/columns/columns.styles";

// =============================================================================
// STYLE INTERFACES
// =============================================================================
interface IActionButtonStyleProps {
    $disabled?: boolean;
}
interface IDroppableWrapperProps {
    isOver: boolean;
    $size: "full" | "left" | "right";
}

interface IElementCardProps extends IProps {
    $isDragging: boolean;
}

// =============================================================================
// STYLING
// =============================================================================
export const DragHandle = styled(DragHandleIcon)`
    display: none;
    transition: width 0.1s ease-out;
    min-width: 1.25rem;

    svg {
        height: 1.25rem;
        width: 1.25rem;
    }
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
    flex: 1;
    &:hover ${DragHandle} {
        display: block;
    }
`;

export const DetailsContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 0.25rem;
    overflow: hidden;
`;

export const ElementName = styled(Text.Body)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const IdLabel = styled(Text.XSmall)`
    color: ${Color.Neutral[3]};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
                cursor: not-allowed;
            `;
        } else {
            return css`
                color: ${Color.Primary};

                :hover {
                    color: ${Color.Secondary};
                }
            `;
        }
    }}
`;

export const DroppableWrapper = styled.div<IDroppableWrapperProps>`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    width: 100%;
    padding: 0.4rem;
    gap: 0.25rem;
    border: 1px solid transparent;
    z-index: -1;

    ${({ $size }) => generateElementCardView($size)}

    ${({ isOver }) =>
        isOver &&
        css`
            border: 1px dashed ${Color.Primary};
            border-radius: 0.25rem;
            background: ${Color.Accent.Light[5]};
        `}

    svg {
        color: ${Color.Primary};
        height: 2.08rem;
        width: 2.08rem;
    }
`;

export const DroppableText = styled(Text.Body)`
    color: ${Color.Primary};
    text-align: center;
    font-size: 1rem;
`;

export const ElementBaseCard = styled(BaseCard)<IElementCardProps>`
    cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "pointer")};
`;

export const CardWrapper = styled.div`
    position: relative;
`;
