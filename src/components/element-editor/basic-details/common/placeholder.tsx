import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TFormFieldValues } from "src/schemas";

export const Placeholder = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<TFormFieldValues>();

    return (
        <Controller
            name="placeholder"
            control={control}
            render={({ field }) => (
                <Form.Input
                    {...field}
                    label="Placeholder text (optional)"
                    placeholder="Enter placeholder text"
                    value={field.value || ""}
                    onChange={(e) => {
                        field.onChange(e.target.value);
                    }}
                    errorMessage={errors.placeholder?.message}
                />
            )}
            shouldUnregister={true}
        />
    );
};
