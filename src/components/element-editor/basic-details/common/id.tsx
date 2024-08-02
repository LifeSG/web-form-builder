import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { Controller, useFormContext } from "react-hook-form";
import { TFormFieldValues } from "src/schemas";

export const Id = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<TFormFieldValues>();

    return (
        <Controller
            name="id"
            control={control}
            render={({ field }) => (
                <Form.Input
                    {...field}
                    label={{
                        children: "ID",
                        subtitle: (
                            <Text.H6 weight={400}>
                                ID is used to differentiate element from the
                                others in the UI schema.
                            </Text.H6>
                        ),
                    }}
                    placeholder="Create an ID"
                    value={field.value || ""}
                    onChange={(e) => {
                        field.onChange(e.target.value);
                    }}
                    errorMessage={errors.id?.message}
                />
            )}
            shouldUnregister={true}
        />
    );
};
