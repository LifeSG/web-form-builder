import { Button } from "@lifesg/react-design-system/button";
import { Text } from "@lifesg/react-design-system/text";
import styled from "styled-components";

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    gap: 2rem;
`;

export const ActionButton = styled(Button.Default)`
    width: 100%;
`;

export const ModalDisplayTitle = styled(Text.H3)`
    padding: 2rem 0 1rem 0;
`;
