import { useFormContext } from "react-hook-form";
import { EElementType, useBuilder } from "src/context-providers";
import { TFormFieldValues } from "src/schemas";
import {
    AccordionWrapper,
    FieldEditorAccordionItem,
    Wrapper,
} from "./basic-details.styles";
import { ContactBasicDetails } from "./contact";
import { DropdownBasicDetails } from "./dropdown";
import { EmailBasicDetails } from "./email";
import { NumericBasicDetails } from "./numeric";
import { TextBasicDetails } from "./text";
import { TextAreaBasicDetails } from "./text-area";

export const BasicDetails = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { focusedElement } = useBuilder();
    const { watch } = useFormContext<TFormFieldValues>();
    const type = watch("type", focusedElement?.element?.type);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderBasicDetails = () => {
        switch (type) {
            case EElementType.EMAIL:
                return <EmailBasicDetails />;
            case EElementType.TEXT:
                return <TextBasicDetails />;
            case EElementType.TEXTAREA:
                return <TextAreaBasicDetails />;
            case EElementType.NUMERIC:
                return <NumericBasicDetails />;
            case EElementType.CONTACT:
                return <ContactBasicDetails />;
            case EElementType.DROPDOWN:
                return <DropdownBasicDetails />;
            default:
                return null;
        }
    };

    return (
        <AccordionWrapper>
            <FieldEditorAccordionItem
                type="default"
                expanded
                title="Basic"
                $hideTopBorder={focusedElement.isDirty}
            >
                <Wrapper>{renderBasicDetails()}</Wrapper>
            </FieldEditorAccordionItem>
        </AccordionWrapper>
    );
};
