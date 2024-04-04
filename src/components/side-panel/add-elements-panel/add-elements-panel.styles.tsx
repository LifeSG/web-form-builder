import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";

export const Wrapper = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 8rem;
`;

export const Category = styled.li`
    display: flex;
    flex-direction: column;
`;

export const CategoryHeader = styled.div`
    border-bottom: 1px solid ${Color.Neutral[5]};
    margin-bottom: 1rem;
    padding-bottom: 0.375rem;
`;

export const ElementButtonList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
