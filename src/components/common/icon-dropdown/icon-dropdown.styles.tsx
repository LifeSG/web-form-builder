import { Colour } from "@lifesg/react-design-system/theme";
import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
        color: ${Colour["icon-primary-subtlest"]};
        height: 1.5rem;
        width: 1.5rem;
    }
`;
