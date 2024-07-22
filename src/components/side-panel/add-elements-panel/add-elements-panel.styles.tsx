import { Color } from "@lifesg/react-design-system/color";
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

export const ElementSearch = styled(InputGroup)`
    background: ${Color.Neutral[7]};
    color: ${Color.Neutral[4]};
    border: none;

    svg {
        color: ${Color.Neutral[4]};
    }
`;

export const NoResultsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
`;

export const NotFoundIcon = styled(ICircleFillIcon)`
    color: ${Color.Validation.Red.Icon};
    height: 1.125rem;
    width: 1.125rem;
`;
