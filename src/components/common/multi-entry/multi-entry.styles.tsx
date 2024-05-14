import { Accordion } from "@lifesg/react-design-system/accordion";
import { ButtonWithIcon } from "@lifesg/react-design-system/button-with-icon";
import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";

export const MultiEntryAccordionItem = styled(Accordion.Item)`
    width: 100%;
    border-top: 0;
    border-bottom: 1px solid ${Color.Neutral[6]};

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

export const AddMultiEntryButton = styled(ButtonWithIcon.Default)`
    width: 100%;
    margin: 1rem 0;
`;
