import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { Controller, useFormContext } from "react-hook-form";
import { TFormFieldValues } from "src/schemas";

export const IdField = () => {
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
            name="id"
            control={control}
            render={({ field }) => (
                <Form.Input
                    {...field}
                    data-testid="id-field"
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
                    errorMessage={errors.id?.message}
                />
            )}
        />
    );
};
