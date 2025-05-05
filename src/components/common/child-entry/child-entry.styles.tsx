import { Colour } from "@lifesg/react-design-system/theme";
import styled from "styled-components";

export const Wrapper = styled.div`
    background: ${Colour["bg-strong"]};
    display: flex;
    flex: 1;
    width: 100%;
    align-items: center;
    margin-bottom: 2rem;
    padding-right: 1rem;
`;

export const ChildrenWrapper = styled.div`
    padding: 1rem;
    flex: 1;
`;
