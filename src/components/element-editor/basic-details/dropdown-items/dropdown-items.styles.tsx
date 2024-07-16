import styled from "styled-components";
import { ButtonWithIcon } from "@lifesg/react-design-system";

export const DropdownItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

export const DropdownItemsButtonsWrapper = styled.div`
    display: flex;
    gap: 16px;
`;

export const DropdownItemsButton = styled(ButtonWithIcon.Small)`
    width: 100%;
`;
