import { MediaQuery } from "@lifesg/react-design-system/media";
import { Modal } from "@lifesg/react-design-system/modal";
import styled from "styled-components";

export const ModalBox = styled(Modal.Box)`
    width: 100%;
    max-width: 42rem;

    /* to grow with content */
    height: auto;
    max-height: none;

    margin: auto;
`;

export const ModalInner = styled.div`
    margin: 4rem;
    text-align: center;

    ${MediaQuery.MaxWidth.mobileL} {
        margin: 4rem 1.25rem;
    }
`;
