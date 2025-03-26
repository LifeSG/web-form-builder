import { V2_Color } from "@lifesg/react-design-system/v2_color";
import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
        color: ${V2_Color.Accent.Light[2]};
        height: 1.5rem;
        width: 1.5rem;
    }
`;
