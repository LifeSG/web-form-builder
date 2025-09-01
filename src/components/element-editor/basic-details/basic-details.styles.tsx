import { Accordion } from "@lifesg/react-design-system/accordion";
import { Border, Colour } from "@lifesg/react-design-system/theme";
import styled from "styled-components";

interface IFieldEditorAccordionItemProps {
    $hideTopBorder: boolean;
}

export const Wrapper = styled.div`
    padding: 0 1rem 0 1rem;
    margin: 2rem 0 1rem 0;
`;

export const AccordionItem = styled(
    Accordion.Item
)<IFieldEditorAccordionItemProps>`
    border-top: ${({ $hideTopBorder }) =>
        $hideTopBorder
            ? `${Border["width-010"]} ${Border.solid} ${Colour.border};`
            : "0"};

    margin-top: ${({ $hideTopBorder }) => ($hideTopBorder ? "0" : "-1rem")};

    #content-container {
        padding: 0;
    }

    [data-testid="accordion-item-title"] {
        margin: 1rem 0 1rem 1rem;
    }

    [data-testid="accordion-item-expandable-container"] {
        display: flex;
        flex-direction: column;
    }

    [data-testid="accordion-item-expand-collapse-button"] {
        margin-left: 0;
        margin-right: 0.1rem;
        padding: 0 1rem 0 0;
    }
`;

export const AccordionWrapper = styled(Accordion)`
    & > div:first-child {
        display: none;
    }
`;
