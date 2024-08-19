import { Alert } from "@lifesg/react-design-system/alert";
import { Button } from "@lifesg/react-design-system/button";
import { Color } from "@lifesg/react-design-system/color";
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
    background-color: ${Color.Accent.Light[5]};
    box-sizing: border-box;
`;

export const IconButton = styled.button<IModeButtonProps>`
    background: ${({ $active }) =>
        $active ? Color.Accent.Light[4] : "transparent"};
    color: ${Color.Primary};
    display: grid;
    cursor: pointer;
    border: none;
    border-radius: 0.25rem;
    padding: 1rem;
    align-self: center;

    :hover {
        background: ${Color.Accent.Light[4]};
    }

    :focus {
        outline-color: ${Color.Primary};
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
    border: 1px solid ${Color.Neutral[5]};
    border-radius: 4px;
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

export const AlertMessage = styled(Alert)`
    width: 80vw;
`;
