import { V2_Text } from "@lifesg/react-design-system/v2_text";
import { Accordion } from "@lifesg/react-design-system/accordion";
import { ButtonWithIcon } from "@lifesg/react-design-system/button-with-icon";
import { V2_Color } from "@lifesg/react-design-system/v2_color";
import styled from "styled-components";
import { PopoverTrigger } from "@lifesg/react-design-system";

interface MultiEntryAccordionItemProps {
    $hasSubtitle: boolean;
}

export const SubtitleText = styled(V2_Text.Body)`
    margin-bottom: 2rem;
`;

export const MultiEntryAccordionItem = styled(
    Accordion.Item
)<MultiEntryAccordionItemProps>`
    width: 100%;
    border-top: 0;
    border-bottom: 1px solid ${V2_Color.Neutral[6]};
    padding-bottom: ${({ $hasSubtitle }) => ($hasSubtitle ? `0.5rem` : "0")};

    #content-container {
        padding: 0;
    }

    ${SubtitleText} {
        font-size: 0.875rem !important;
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
        margin: ${({ $hasSubtitle }) =>
            $hasSubtitle ? `1rem 0 0.5rem 1rem` : "1rem 0 1rem 1rem"};
    }
`;

export const AddMultiEntryButton = styled(ButtonWithIcon.Default)`
    width: 100%;
    margin: 1rem 0;
`;
