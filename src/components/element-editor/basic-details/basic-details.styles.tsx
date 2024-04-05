import { Form } from "@lifesg/react-design-system";
import { Accordion } from "@lifesg/react-design-system/accordion";
import styled from "styled-components";

export const MandatoryFieldBox = styled.div`
    background: rgba(248, 248, 248, 1);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

export const FieldEditorAccordionItem = styled(Accordion.Item)`
    #content-container {
        padding: 0;
    }

    [data-testid="accordion-item-expandable-container"] {
        padding-left: 1rem;
        display: flex;
        flex-direction: column;
    }

    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

export const IdLabel = styled(Form.Label)`
    > span[data-testid="subtitle"] {
        text-decoration: none;
        font-size: 14px;
        font-family: Open Sans;
    }
`;
