import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
    EElementType,
    TextBasedElementTypes,
    useBuilder,
    useIsElementDisabled,
    useShouldShowPrefill,
} from "src/context-providers";
import { TFormFieldValues } from "src/yup-schemas";
import { BasicDetails } from "./basic-details";
import { ConditionalRendering } from "./conditional-rendering";
import { EditorAlert, Wrapper } from "./element-editor.styles";
import { Prefill } from "./prefill";
import { Validation } from "./validation/";

export const ElementEditor = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { focusedElement, updateFocusedElement, selectedElementType } =
        useBuilder();

    const {
        formState: { isDirty },
        getFieldState,
    } = useFormContext<TFormFieldValues>();

    const { isTouched: isTypeTouched } = getFieldState("type");
    const shouldShowPrefill = useShouldShowPrefill();
    const isDisabled = useIsElementDisabled(
        focusedElement.element.id,
        focusedElement.element.type
    );

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const isTextBasedElement = (elementType: EElementType) => {
        return TextBasedElementTypes.has(elementType);
    };
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
            {isDisabled && (
                <EditorAlert type="warning" showIcon>
                    Changes is not allowed for this field
                </EditorAlert>
            )}
            {focusedElement.isDirty && (
                <EditorAlert type="warning" showIcon>
                    To reflect changes on preview, save changes first.
                </EditorAlert>
            )}
            <BasicDetails />
            {isTextBasedElement(selectedElementType) && <Validation />}
            <ConditionalRendering />
            {shouldShowPrefill && <Prefill />}
        </Wrapper>
    );
};
