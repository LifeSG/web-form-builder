import { Colour } from "@lifesg/react-design-system/theme";
import { InputGroup } from "@lifesg/react-design-system/input-group";
import { ICircleFillIcon } from "@lifesg/react-icons";
import styled from "styled-components";

export const Wrapper = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 8rem;
`;

export const Category = styled.li`
    display: flex;
    flex-direction: column;
`;

export const CategoryHeader = styled.div`
    border-bottom: 1px solid ${Colour.border};
    margin-bottom: 1rem;
    padding-bottom: 0.375rem;
`;

export const ElementButtonList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ElementSearch = styled(InputGroup)`
    background: ${Colour["bg-strong"]};
    color: ${Colour["text-subtlest"]};
    border: none;

    svg {
        color: ${Colour["icon-subtle"]};
    }
`;

export const NoResultsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
`;

export const NotFoundIcon = styled(ICircleFillIcon)`
    color: ${Colour["icon-error"]};
    height: 1.125rem;
    width: 1.125rem;
`;
