import { Border, Colour, Motion } from "@lifesg/react-design-system/theme";
import { Typography } from "@lifesg/react-design-system/typography";
import { Font } from "@lifesg/react-design-system/theme";
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
    transition: width ${Motion["duration-150"]} ease-out;
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
    height: 3.125rem;
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

export const ElementName = styled(Typography.BodyBL)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const IdLabel = styled(Typography.BodyXS)`
    color: ${Colour["text-subtler"]};
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
    ${Font["body-xs-semibold"]}

    svg {
        height: 1rem;
        width: 1rem;
    }

    ${({ $disabled }) => {
        if ($disabled) {
            return css`
                color: ${Colour["text-disabled"]};
                cursor: not-allowed;
            `;
        } else {
            return css`
                color: ${Colour["text-primary"]};

                :hover {
                    color: ${Colour["text-hover"]};
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
    ${Border.Util.solid({
        thickness: Border["width-010"],
        colour: "transparent",
    })};
    z-index: -1;

    ${({ $size }) => generateElementCardView($size)}

    ${({ isOver }) =>
        isOver &&
        css`
            ${Border.Util["dashed-default"]({
                thickness: Border["width-010"],
                colour: Colour["border-primary"],
            })};
            border-radius: 0.25rem;
            background: ${Colour["bg-hover-subtle"]};
        `}

    svg {
        color: ${Colour["icon-primary"]};
        height: 2.08rem;
        width: 2.08rem;
    }
`;

export const DroppableText = styled(Typography.BodyMD)`
    color: ${Colour["text-primary"]};
    text-align: center;
`;

export const ElementBaseCard = styled(BaseCard)<IElementCardProps>`
    cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "pointer")};
`;

export const CardWrapper = styled.div`
    position: relative;
`;
