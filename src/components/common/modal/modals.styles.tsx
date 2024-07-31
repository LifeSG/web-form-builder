import { Button } from "@lifesg/react-design-system/button";
import { Modal } from "@lifesg/react-design-system/modal";
import styled from "styled-components";

export const ScrollableModal = styled(Modal)`
    /* increase specificity as the styles are overwritten */
    && {
        height: 100%;
        overflow-y: auto;
    }
    cursor: pointer;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    gap: 2rem;
`;

export const ActionButton = styled(Button.Default)`
    width: 100%;
`;
