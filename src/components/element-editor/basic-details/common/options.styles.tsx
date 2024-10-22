import { ButtonWithIcon } from "@lifesg/react-design-system/button-with-icon";
import styled from "styled-components";

export const OptionsWrapper = styled.div`
    margin-bottom: 2rem;
`;

export const OptionsButtonsWrapper = styled.div`
    display: flex;
    gap: 1rem;
`;

export const OptionsButton = styled(ButtonWithIcon.Small)`
    flex: 1;
`;
