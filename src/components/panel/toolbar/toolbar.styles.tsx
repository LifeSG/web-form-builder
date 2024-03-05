import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";

export const ToolbarWrapper = styled.div`
    height: 100%;
    background: ${Color.Neutral[8]};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    padding: 2rem 1rem;
    border: 1px solid ${Color.Neutral[5]};
    border-style: none solid none none;
    gap: 2rem;
`;

export const ModeButton = styled.button<{ $active: boolean }>`
    background: ${(props) =>
        props.$active ? Color.Accent.Light[4](props) : "transparent"};
    color: ${Color.Primary};
    display: grid;
    cursor: pointer;
    padding: 1rem;
    border: none;
    border-radius: 0.25rem;

    &:hover {
        background: ${Color.Accent.Light[4]};
    }

    svg {
        width: 1.625rem;
        height: 1.625rem;
    }
`;
