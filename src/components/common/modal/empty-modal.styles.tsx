import { MediaQuery, Modal } from "@lifesg/react-design-system";
import styled from "styled-components";

export const ScrollableModal = styled(Modal)`
    /* increase specificity as the styles are overwritten */
    && {
        height: 100%;
        overflow-y: auto;
    }
    cursor: pointer;
`;

export const GrowContainer = styled.div`
    margin: auto;
    padding: 5rem 1.25rem;
    width: 100%;

    ${MediaQuery.MaxWidth.mobileL} {
        padding: 1rem 1.25rem;
    }
`;
