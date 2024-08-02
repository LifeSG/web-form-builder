import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TFormFieldValues } from "src/schemas";

export const Label = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<TFormFieldValues>();

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
                    value={field.value as string}
                    onChange={(e) => {
                        field.onChange(e.target.value);
                    }}
                    errorMessage={errors.label?.message}
                    maxLength={40}
                />
            )}
            shouldUnregister={true}
        />
    );
};
