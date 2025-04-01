import { Colour } from "@lifesg/react-design-system/theme";
import styled from "styled-components";

export const Container = styled.div`
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 0.4rem;
    background: ${Colour["bg-primary-subtlest"]};

    svg {
        color: ${Colour["icon-primary-subtlest"]};
        height: 1.5rem;
        width: 1.5rem;
    }
`;
