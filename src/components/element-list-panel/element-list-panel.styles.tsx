import { Layout } from "@lifesg/react-design-system/layout";
import { Text } from "@lifesg/react-design-system/text";
import styled from "styled-components";

export const Wrapper = styled(Layout.ColDiv)``;

export const EmptyDisplay = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 100%;
`;

export const EmptyDisplayTitle = styled(Text.H3)`
    margin-top: 2rem;
`;

export const EmptyDisplayDescription = styled(Text.Body)`
    margin-top: 1rem;
`;
