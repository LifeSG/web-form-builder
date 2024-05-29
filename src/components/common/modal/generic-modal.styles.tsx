import { Button } from "@lifesg/react-design-system/button";
import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import { MediaQuery } from "@lifesg/react-design-system/media";
import { Modal } from "@lifesg/react-design-system/modal";
import { Text, TextStyleHelper } from "@lifesg/react-design-system/text";
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

export const ModalBody = styled(Text.Body)`
    margin: 0.5rem 0 2rem;
`;

export const ModalButton = styled(Button.Default)`
    min-width: 16rem;
    margin: 0 auto;

    ${MediaQuery.MaxWidth.mobileL} {
        width: 100%;
        min-width: unset;
    }
`;

export const ParagraphBody = styled(Text.Body)`
    &:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

export const CustomErrorDisplay = styled(ErrorDisplay)`
    [data-id="error-display-title"] {
        ${TextStyleHelper.getTextStyle("H3", "semibold")}
    }
    [data-id="error-display-description"] {
        margin: 1rem 0 2rem;
    }
    p {
        line-height: 1.625rem !important;
    }
`;
