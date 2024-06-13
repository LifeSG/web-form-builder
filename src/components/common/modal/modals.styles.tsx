import { Modal } from "@lifesg/react-design-system";
import styled from "styled-components";

export const ScrollableModal = styled(Modal)`
    /* increase specificity as the styles are overwritten */
    && {
        height: 100%;
        overflow-y: auto;
    }
    cursor: pointer;
`;
