import { V2_Layout } from "@lifesg/react-design-system/v2_layout";
import { V2_MediaQuery } from "@lifesg/react-design-system/v2_media";
import styled from "styled-components";

export interface IContainerProps {
    $isLargeScreen: boolean;
}

export interface IWrapperProps {
    $disabled?: boolean;
}

export const Wrapper = styled(V2_Layout.Section)<IWrapperProps>`
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "auto")};
    height: 100%;
    overflow-x: hidden;
    padding-left: 0 !important;
    padding-right: 0 !important;
`;

export const Container = styled(V2_Layout.Container)<IContainerProps>`
    position: relative;
    height: 100%;
    padding: 2rem 3rem;
    display: ${({ $isLargeScreen }) => ($isLargeScreen ? "grid" : "none")};
    ${V2_MediaQuery.MaxWidth.tablet} {
        max-width: unset;
        width: 100%;
    }
`;
