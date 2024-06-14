import { Color } from "@lifesg/react-design-system/color";
import { Text, TextStyleHelper } from "@lifesg/react-design-system/text";
import { DragHandleIcon } from "@lifesg/react-icons";
import styled, { css } from "styled-components";
import { BaseCard, IProps } from "../common";
import { MediaQuery } from "@lifesg/react-design-system/media";

// =============================================================================
// STYLE INTERFACES
// =============================================================================
interface IActionButtonStyleProps {
    $disabled?: boolean;
}
interface IDroppableWrapperProps {
    isOver: boolean;
    $size: "full" | "third-left" | "third-right";
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

    svg {
        height: 1.25rem;
        width: 1.25rem;
    }
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    &:hover ${DragHandle} {
        display: block;
    }
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
    position: relative;
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

    ${({ $size }) => css`
        ${MediaQuery.MaxWidth.desktop4k} {
            grid-column: auto / span ${$size === "full" ? 6 : 3};
        }

        ${MediaQuery.MaxWidth.desktopL} {
            grid-column: auto / span ${$size === "full" ? 8 : 4};
        }

        ${MediaQuery.MaxWidth.tablet} {
            grid-column: auto / span ${$size === "full" ? 6 : 3};
        }
    `}

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

    ${({ $size }) => {
        if ($size === "third-right") {
            return css`
                justify-self: flex-start;
                width: 100%;
            `;
        } else if ($size === "third-left") {
            return css`
                justify-self: flex-end;
                width: 100%;
            `;
        }
    }}
`;

export const DroppableText = styled(Text.Body)`
    color: ${Color.Primary};
    text-align: center;
    font-size: 1rem;
`;

export const ElementBaseCard = styled(BaseCard)<IElementCardProps>`
    cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "pointer")};
`;
