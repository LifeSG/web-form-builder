import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TFormFieldValues } from "src/yup-schemas";

export const PlaceholderField = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const {
        control,
        formState: { errors },
    } = useFormContext<TFormFieldValues>();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="placeholder"
            control={control}
            render={({ field }) => (
                <Form.Input
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
