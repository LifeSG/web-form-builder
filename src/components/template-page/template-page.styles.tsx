import { Transition } from "@lifesg/react-design-system/transition";
import styled from "styled-components";

export const Page = styled.div`
    min-height: 100vh;
`;

export const PageBody = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem 3rem;
`;

export const ContentWrapper = styled.div`
    height: 100%;
    transition: ${Transition.Base};
    margin-top: 3.5rem;
`;
