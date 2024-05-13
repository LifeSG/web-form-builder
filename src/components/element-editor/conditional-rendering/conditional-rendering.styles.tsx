import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import styled from "styled-components";

export const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const SelectFieldContainer = styled.div`
    display: grid;
    grid-template-columns: 6fr 3fr;
    gap: 1rem;
`;

export const SelectFieldWrapper = styled(Form.Select)`
    [data-testid="dropdown-list"] {
        max-height: 10rem;
    }
`;

export const OptionIDText = styled(Text.XSmall)`
    text-align: justify;
`;
