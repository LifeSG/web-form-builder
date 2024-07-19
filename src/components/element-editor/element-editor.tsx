import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useBuilder } from "src/context-providers";
import { IBaseTextBasedFieldValues } from "src/schemas";
import { BasicDetails } from "./basic-details";
import { ConditionalRendering } from "./conditional-rendering";
import {
    AccordionWrapper,
    SaveChangesAlert,
    Wrapper,
} from "./element-editor.styles";
import { Prefill } from "./prefill";
import { Validation } from "./validation/validation";

export const ElementEditor = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { focusedElement, updateFocusedElement } = useBuilder();

    const {
        formState: { isDirty },
        getFieldState,
    } = useFormContext<IBaseTextBasedFieldValues>();

    const { isTouched: isTypeTouched } = getFieldState("type");

    // =========================================================================
    // EFFECTS
    // =========================================================================

    useEffect(() => {
        // Once the element type is touched, that element should be considered dirty until it is saved or its changes are discarded.
        if (isTypeTouched) {
            updateFocusedElement(true);
            return;
        }
        updateFocusedElement(!!isDirty);
    }, [isDirty, updateFocusedElement]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Wrapper data-testid="element-editor">
            {focusedElement.isDirty && (
                <SaveChangesAlert type="warning" showIcon>
                    To reflect changes on preview, save changes first.
                </SaveChangesAlert>
            )}
            <AccordionWrapper>
                <BasicDetails />
            </AccordionWrapper>
            <Validation />
            <ConditionalRendering />
            <Prefill />
        </Wrapper>
    );
};
