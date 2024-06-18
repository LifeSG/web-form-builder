import { Layout } from "@lifesg/react-design-system/layout";
import { MediaQuery } from "@lifesg/react-design-system/media";
import styled from "styled-components";

export const Wrapper = styled(Layout.Section)`
    height: 100%;
    overflow-x: hidden;
    padding-left: 0 !important;
    padding-right: 0 !important;
`;

export const Container = styled(Layout.Container)`
    position: relative;
    height: 100%;
    padding: 2rem 3rem;

    /* To accommodate to desktops of 1024px */
    ${MediaQuery.MaxWidth.tablet} {
        max-width: unset;
        width: 100%;
    }
`;
