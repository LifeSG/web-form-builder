import { useFormContext } from "react-hook-form";
import { EElementType, useBuilder } from "src/context-providers";
import { TFormFieldValues } from "src/schemas";
import {
    AccordionWrapper,
    AccordionItem,
    Wrapper,
} from "./basic-details.styles";
import {
    ContactBasicDetails,
    DropdownBasicDetails,
    EmailBasicDetails,
    LongTextBasicDetails,
    NumericBasicDetails,
    TextBasicDetails,
} from "./elements";

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
                return <LongTextBasicDetails />;
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
            <AccordionItem
                type="default"
                expanded
                title="Basic"
                $hideTopBorder={focusedElement.isDirty}
            >
                <Wrapper>{renderBasicDetails()}</Wrapper>
            </AccordionItem>
        </AccordionWrapper>
    );
};
