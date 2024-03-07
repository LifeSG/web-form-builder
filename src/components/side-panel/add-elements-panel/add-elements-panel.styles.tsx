import { Divider } from "@lifesg/react-design-system/divider";
import styled from "styled-components";

export const ElementPickerWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 6rem;
    gap: 2rem;
    overflow-y: auto;
`;

export const ElementButtonListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.3rem;
`;

export const FieldCategoryDivider = styled(Divider)`
    margin: 0.2rem 0;
`;
