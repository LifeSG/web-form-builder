import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";

export const Wrapper = styled.div`
    background: ${Color.Neutral[7]};
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
`;

export const ChildStyles = styled.div`
    padding: 1rem;
    width: 100%;
    flex-grow: 1;
`;

export const DeleteValidationButton = styled.div`
    padding: 1rem 1rem 1rem 0;
    svg {
        color: ${Color.Accent.Light[1]};
        width: 1.9rem;
        height: 1.9rem;
        cursor: pointer;
    }
`;

export const ValidationFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
