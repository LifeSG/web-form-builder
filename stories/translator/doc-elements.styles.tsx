import { Alert } from "@lifesg/react-design-system/alert";
import { Button } from "@lifesg/react-design-system/button";
import { Border, Colour, Radius } from "@lifesg/react-design-system/theme";
import { Textarea } from "@lifesg/react-design-system/input-textarea";
import styled from "styled-components";

interface IContentWrapperProps {
    $visible?: boolean;
}

export interface IModeButtonProps {
    $active: boolean;
}

export const ContentWrapper = styled.div<IContentWrapperProps>`
    height: calc(100vh - 5.1rem);
    width: 100%;
    display: ${({ $visible = true }) => ($visible ? "block" : "none")};
`;

export const IconWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 5rem;
    justify-content: flex-end;
    z-index: 1;
    gap: 2rem;
    padding: 1rem;
    background-color: ${Colour["bg-primary-subtlest"]};
    box-sizing: border-box;
`;

export const IconButton = styled.button<IModeButtonProps>`
    background: ${({ $active }) =>
        $active ? Colour["bg-selected-strong"] : "transparent"};
    color: ${Colour["text-primary"]};
    display: grid;
    cursor: pointer;
    border: none;
    border-radius: ${Radius.xs};
    padding: 1rem;
    align-self: center;

    :hover {
        background: ${Colour["bg-hover-strong"]};
    }

    :focus {
        outline-color: ${Colour["border-focus-strong"]};
    }

    svg {
        width: 1.625rem;
        height: 1.625rem;
    }
`;

export const ViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
`;

export const SchemaPreview = styled(Textarea)`
    width: 80vw;
    height: 60vw;
    overflow: auto;
    padding: 1rem;
    ${Border.Util.solid({
        thickness: Border["width-010"],
        colour: Colour["border-primary"],
    })};
    border-radius: ${Radius.sm};
`;

export const SaveButton = styled(Button.Default)`
    width: 10rem;
    margin-left: auto;
`;

export const ActionWrapper = styled.div`
    display: flex;
    width: 80vw;
    gap: 2rem;
`;

export const AlertWrapper = styled(Alert)`
    flex-grow: 1;
`;
