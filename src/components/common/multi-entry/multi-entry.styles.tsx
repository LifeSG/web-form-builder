import { Typography } from "@lifesg/react-design-system/typography";
import { Accordion } from "@lifesg/react-design-system/accordion";
import { ButtonWithIcon } from "@lifesg/react-design-system/button-with-icon";
import { Border, Colour } from "@lifesg/react-design-system/theme";
import styled from "styled-components";

interface MultiEntryAccordionItemProps {
    $hasSubtitle: boolean;
}

export const SubtitleText = styled(Typography.BodyBL)`
    margin-bottom: 2rem;
`;

export const MultiEntryAccordionItem = styled(
    Accordion.Item
)<MultiEntryAccordionItemProps>`
    width: 100%;
    border-top: 0;
    border-bottom: ${Border["width-010"]} ${Border.solid} ${Colour.border};
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
        padding: 0 1rem 0 0;
    }

    [data-testid="accordion-item-title"] {
        margin: ${({ $hasSubtitle }) =>
            $hasSubtitle ? `1rem 0 0.5rem 1rem` : "1rem 0 1rem 1rem"};
    }

    [data-testid="content-container"] {
        padding-right: 0;
    }
`;

export const AddMultiEntryButton = styled(ButtonWithIcon.Default)`
    width: 100%;
    margin: 1rem 0;
`;
