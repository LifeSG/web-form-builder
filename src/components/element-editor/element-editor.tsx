import { useBuilder } from "src/context-providers";
import { BasicDetails } from "./basic-details";
import { ConditionalRendering } from "./conditional-rendering";
import {
    AccordionWrapper,
    SaveChangesAlert,
    Wrapper,
} from "./element-editor.styles";
import { Prefill } from "./prefill";
import { Validation } from "./validation/validation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { IBaseTextBasedFieldValues } from "src/schemas";

export const ElementEditor = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { focusedElement, updateFocusedElement } = useBuilder();

    const {
        formState: { isDirty },
        getFieldState,
        getValues,
    } = useFormContext<IBaseTextBasedFieldValues>();

    const { isTouched: isTypeTouched } = getFieldState("type");

    useEffect(() => {
        // Once the element type is touched, that element should be considered dirty until it is saved or its changes are discarded.
        if (isTypeTouched) {
            updateFocusedElement(true);
            return;
        }
        updateFocusedElement(!!isDirty);
    }, [isDirty, updateFocusedElement]);

    return (
        <Wrapper>
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
