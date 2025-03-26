import { V2_Color } from "@lifesg/react-design-system/v2_color";
import styled from "styled-components";

export const Wrapper = styled.div`
    background: ${V2_Color.Neutral[7]};
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
