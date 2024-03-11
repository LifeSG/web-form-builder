import styled, { css } from "styled-components";
import { ICardContentStyles } from "./types";
import { DragHandleIcon } from "@lifesg/react-icons/drag-handle";
import { Button } from "@lifesg/react-design-system/button";
import { Color } from "@lifesg/react-design-system/color";
import { Spacer } from "../common/spacer";

export const CardContent = styled.div<ICardContentStyles>`
    padding: 1rem;
    border-radius: 0.5rem;
    position: relative;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 8px 0px rgba(104, 104, 104, 0.24);

    ${({ $isFocused }) =>
        $isFocused
            ? css`
                  border: 1px solid ${Color.Primary};
                  background: ${Color.Accent.Light[5]};
              `
            : css`
                  border: 1px solid transparent;
              `}

    :hover {
        border-color: ${Color.Primary};
    }
`;

export const CardBody = styled(Spacer)`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const CardDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const CardIcon = styled.div`
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 0.4rem;
    background: ${Color.Accent.Light[5]};

    svg {
        color: ${Color.Accent.Light[2]};
        height: 1.5rem;
        width: 1.5rem;
    }
`;

export const CardDragger = styled(DragHandleIcon)`
    height: 1.2rem;
    width: 1.2rem;
    cursor: grab;
    color: ${Color.Accent.Light[2]};
`;

export const CardActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    position: absolute;
    right: 1rem;
    top: 2rem;
    bottom: 2rem;
`;

export const CardAction = styled(Button.Small)`
    height: auto;
    background: transparent;
    padding: 0;
    border: none;

    span {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    :hover {
        box-shadow: none;
    }
`;
