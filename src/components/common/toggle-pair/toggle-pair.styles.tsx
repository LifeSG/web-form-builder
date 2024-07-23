import { Toggle } from "@lifesg/react-design-system/toggle";
import styled from "styled-components";

interface IRowProps {
    $marginRequired: boolean;
}

export const Row = styled.div<IRowProps>`
    display: flex;
    gap: 2rem;
    margin-bottom: ${({ $marginRequired }) => ($marginRequired ? "2rem" : 0)};
    justify-content: start;
`;
export const ToggleWrapper = styled(Toggle)`
    label {
        gap: 0.5rem;
        display: flex;
    }
`;
