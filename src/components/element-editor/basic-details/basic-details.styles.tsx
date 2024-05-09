import { Color } from "@lifesg/react-design-system/color";
import { Accordion } from "@lifesg/react-design-system/accordion";
import styled from "styled-components";

interface FieldEditorAccordionItemProps {
    $hideTopBorder: boolean;
}

export const MandatoryFieldBox = styled.div`
    background: rgba(248, 248, 248, 1);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

export const Wrapper = styled.div`
    padding: 0 1rem 0 1rem;
    &:last-child {
        margin-bottom: 1rem;
    }

    > :first-child {
        margin-top: 2rem;
    }
`;

export const FieldEditorAccordionItem = styled(
    Accordion.Item
)<FieldEditorAccordionItemProps>`
    border-top: ${({ $hideTopBorder }) =>
        $hideTopBorder ? `1px solid ${Color.Neutral[6]}` : "0"};

    #content-container {
        padding: 0;
    }

    [data-testid="accordion-item-title"] {
        padding: ${({ $hideTopBorder }) =>
            $hideTopBorder ? `0` : "0 1rem 0 0"};
        margin: ${({ $hideTopBorder }) =>
            $hideTopBorder ? `1rem 0 1rem 1rem` : "0 0 1rem 1rem"};
    }

    [data-testid="accordion-item-expandable-container"] {
        display: flex;
        flex-direction: column;
    }

    [data-testid="accordion-item-expand-collapse-button"] {
        margin-right: 0.1rem;
    }
`;
