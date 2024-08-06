import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TFormFieldValues } from "src/schemas";

export const LabelField = () => {
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
            name="label"
            control={control}
            render={({ field }) => (
                <Form.Textarea
                    {...field}
                    label="Element Name"
                    rows={1}
                    placeholder="Enter element name"
                    errorMessage={errors.label?.message}
                    maxLength={40}
                />
            )}
            shouldUnregister={true}
        />
    );
};
