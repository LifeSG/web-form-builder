import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";

export const Container = styled.div`
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
