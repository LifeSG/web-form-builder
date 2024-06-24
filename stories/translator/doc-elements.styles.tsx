import { Color } from "@lifesg/react-design-system";
import styled from "styled-components";

interface IContentWrapperProps {
    visible: boolean;
}

export interface IModeButtonProps {
    $active: boolean;
}

export const ContentWrapper = styled.div<IContentWrapperProps>`
    height: calc(100vh - 5.1rem);
    width: 100vw;
    display: ${({ visible }) => (visible ? "block" : "none")};
`;

export const IconWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 5rem;
    justify-content: flex-end;
    z-index: 1;
    gap: 2rem;
    padding: 1rem 1rem 0.5rem 0;
    background-color: ${Color.Accent.Light[5]};
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

export const PreviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
`;

export const SchemaViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
`;

export const SchemaPreview = styled.div`
    margin: 2rem;
    width: 80vw;
    max-height: 31.25rem;
    padding: 1rem;
    overflow: auto;
    border: 0.063rem solid #ccc;
    border-radius: 4px;
`;
