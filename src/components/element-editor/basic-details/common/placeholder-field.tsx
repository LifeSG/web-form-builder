import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import {
    useBuilder,
    useIsAttributeDisabled,
    useIsElementDisabled,
} from "src/context-providers";
import { TFormFieldValues } from "src/yup-schemas";

export const PlaceholderField = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const {
        control,
        formState: { errors },
    } = useFormContext<TFormFieldValues>();

    const { focusedElement } = useBuilder();
    const isElementDisabled = useIsElementDisabled(
        focusedElement.element.id,
        focusedElement.element.type
    );
    const isAttributeDisabled = useIsAttributeDisabled(
        focusedElement,
        "placeholder"
    );
    const isDisabled = isElementDisabled || isAttributeDisabled;

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="placeholder"
            control={control}
            render={({ field }) => (
                <Form.Input
                    disabled={isDisabled}
                    {...field}
                    data-testid="placeholder-field"
                    label="Placeholder text (optional)"
                    placeholder="Enter placeholder text"
                    value={field.value || ""}
                    errorMessage={errors.placeholder?.message}
                />
            )}
        />
    );
};
