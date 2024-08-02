import { Toggle } from "@lifesg/react-design-system/toggle";
import styled from "styled-components";

export const Row = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: start;
`;

export const ToggleWrapper = styled(Toggle)`
    label {
        gap: 0.5rem;
        display: flex;
    }
`;
