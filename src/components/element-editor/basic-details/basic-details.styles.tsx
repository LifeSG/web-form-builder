import { Accordion } from "@lifesg/react-design-system/accordion";
import { Color } from "@lifesg/react-design-system/color";
import styled from "styled-components";
import { Form } from "@lifesg/react-design-system/form";

interface IFieldEditorAccordionItemProps {
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
    overflow: auto;
`;

export const FieldEditorAccordionItem = styled(
    Accordion.Item
)<IFieldEditorAccordionItemProps>`
    border-top: ${({ $hideTopBorder }) =>
        $hideTopBorder ? `1px solid ${Color.Neutral[6]}` : "0"};

    margin-top: ${({ $hideTopBorder }) => ($hideTopBorder ? `0` : "-1rem")};

    #content-container {
        padding: 0;
    }

    [data-testid="accordion-item-title"] {
        margin: ${({ $hideTopBorder }) =>
            $hideTopBorder ? `1rem 0 1rem 1rem` : "0 0 0 1rem"};
    }

    [data-testid="accordion-item-expandable-container"] {
        display: flex;
        flex-direction: column;
    }

    [data-testid="accordion-item-expand-collapse-button"] {
        margin: ${({ $hideTopBorder }) =>
            $hideTopBorder ? `0 0.1rem 0 1rem` : "0 0.1rem 0 0"};
    }
`;

export const StyledTextarea = styled(Form.Textarea)`
    min-height: 40px;
    overflow: hidden;
`;
