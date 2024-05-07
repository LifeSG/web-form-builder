import { Accordion } from "@lifesg/react-design-system/accordion";
import styled from "styled-components";

export const MultiEntryAccordionItem = styled(Accordion.Item)`
    padding-bottom: 2rem;
    width: 100%;

    #content-container {
        padding: 0;
    }

    [data-testid="accordion-item-expandable-container"] {
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
    }

    [data-testid="accordion-item-expand-collapse-button"] {
        margin-right: 1rem;
    }

    [data-testid="accordion-item-title"] {
        margin: 1rem 0 1rem 1rem;
    }
`;
