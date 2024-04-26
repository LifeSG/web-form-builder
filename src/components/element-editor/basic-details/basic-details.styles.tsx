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

export const Wrapper = styled.div`
    &:last-child {
        margin-bottom: 1rem;
    }

    > :first-child {
        margin-top: 2rem;
    }
`;

export const FieldEditorAccordionItem = styled(Accordion.Item)`
    #content-container {
        padding: 0;
    }

    &[aria-label="Collapse"] {
        padding-bottom: 0;
        margin-bottom: 0;
    }

    [data-testid="accordion-item-expandable-container"] {
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
    }

    [data-testid="accordion-item-title"] {
        padding-left: 1rem;
    }
`;
