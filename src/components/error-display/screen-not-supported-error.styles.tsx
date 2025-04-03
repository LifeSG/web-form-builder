import { MediaQuery } from "@lifesg/react-design-system/theme";
import styled from "styled-components";

export const ErrorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    ${MediaQuery.MaxWidth.sm} {
        width: auto;
        padding: 0 2.375rem 0 2.375rem;
    }
`;
