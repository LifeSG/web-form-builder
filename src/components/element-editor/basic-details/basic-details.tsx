import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
    EElementType,
    TElement,
    useBuilder,
    useIsElementDisabled,
} from "src/context-providers";
import { ElementObjectGenerator } from "src/util";
import { TFormFieldValues } from "src/yup-schemas";
import {
    AccordionItem,
    AccordionWrapper,
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
    const { focusedElement, orderedIdentifiers, elements } = useBuilder();
    const {
        watch,
        reset,
        formState: { isDirty },
    } = useFormContext<TFormFieldValues>();
    const type = watch("type", focusedElement?.element?.type);
    const isDisabled = useIsElementDisabled(
        focusedElement.element.id,
        focusedElement.element.type
    );

    // =========================================================================
    // EFFECTS
    // =========================================================================

    /** Upon changing the element type, this useEffect populates the form with
     * default values corresponding to the new type and clears all other fields */
    useEffect(() => {
        if (!isDirty) return;

        const existingIdentifiers = orderedIdentifiers
            .filter(
                (elementId) =>
                    elementId.internalId !== focusedElement.element.internalId
            )
            .map((elementId) => elementId.internalId);

        const existingIds = Object.values(elements)
            .filter((element) => element.id !== focusedElement.element.id)
            .map((element) => element.id);

        const newElement: TElement = ElementObjectGenerator.generate(
            type,
            existingIdentifiers,
            existingIds
        );

        reset(newElement, {
            keepDefaultValues: true, // Dirty form upon changing type
        });
    }, [type]);

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
                $hideTopBorder={focusedElement.isDirty || isDisabled}
            >
                <Wrapper>{renderBasicDetails()}</Wrapper>
            </AccordionItem>
        </AccordionWrapper>
    );
};
