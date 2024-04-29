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
    &[aria-expanded="true"] {
        padding-bottom: 2rem;
    }

    #content-container {
        padding: 0;
    }

    [data-testid="accordion-item-expandable-container"] {
        display: flex;
        flex-direction: column;
    }

    [data-testid="accordion-item-title"] {
        margin-bottom: 2rem;
    }
`;
