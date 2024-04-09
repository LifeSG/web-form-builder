import { Text } from "@lifesg/react-design-system";
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
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
    }

    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
    > *:last-child {
        margin-bottom: 2rem;
    }
`;

export const Subtitle = styled(Text.BodySmall)`
    font-size: 0.875rem !important;
    font-family: Open Sans !important;
`;
