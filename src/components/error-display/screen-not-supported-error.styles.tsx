import { V2_MediaQuery } from "@lifesg/react-design-system/v2_media";
import styled from "styled-components";

export const ErrorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    ${V2_MediaQuery.MaxWidth.mobileL} {
        width: auto;
        padding: 0 2.375rem 0 2.375rem;
    }
`;
