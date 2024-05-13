import { Button } from "@lifesg/react-design-system/button";
import { Accordion } from "@lifesg/react-design-system/accordion";
import styled from "styled-components";

export const MultiEntryAccordionItem = styled(Accordion.Item)`
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
        margin-right: 0.1rem;
    }

    [data-testid="accordion-item-title"] {
        margin: 1rem 0 1rem 1rem;
    }
`;

export const AddMultiEntryButton = styled(Button.Small)`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 2rem 0;

    svg {
        width: 1.2rem;
        height: 1.2rem;
        vertical-align: middle;
        margin-right: 0.5rem;
    }
`;
