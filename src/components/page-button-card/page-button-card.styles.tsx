import { Text } from "@lifesg/react-design-system";
import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`;

export const PageTitle = styled(Text.Body)`
    flex: 1;
`;
