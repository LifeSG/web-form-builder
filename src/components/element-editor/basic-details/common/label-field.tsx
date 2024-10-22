import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import {
    useBuilder,
    useIsAttributeDisabled,
    useIsElementDisabled,
} from "src/context-providers";
import { TFormFieldValues } from "src/yup-schemas";

export const LabelField = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const {
        control,
        formState: { errors },
    } = useFormContext<TFormFieldValues>();

    const { focusedElement } = useBuilder();
    const isElementDisabled = useIsElementDisabled(
        focusedElement?.element?.id,
        focusedElement?.element?.type
    );
    const isAttributeDisabled = useIsAttributeDisabled(focusedElement, "label");
    const isDisabled = isElementDisabled || isAttributeDisabled;

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="label"
            control={control}
            render={({ field }) => (
                <Form.Textarea
                    disabled={isDisabled}
                    {...field}
                    data-testid="label-field"
                    label="Element Name"
                    rows={1}
                    placeholder="Enter element name"
                    errorMessage={errors.label?.message}
                    maxLength={40}
                />
            )}
        />
    );
};
