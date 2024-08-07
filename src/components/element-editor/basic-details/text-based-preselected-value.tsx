import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { Controller, useFormContext } from "react-hook-form";
import { TOverallTextBasedSchema } from "src/schemas";

export const TextBasedPreselectedValue = () => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================
    const {
        control,
        formState: { errors },
    } = useFormContext<TOverallTextBasedSchema>();

    return (
        <Controller
            name="preselectedValue"
            control={control}
            render={({ field }) => (
                <Form.Input
                    {...field}
                    label={{
                        children: "Pre-selected value (optional)",
                        subtitle: (
                            <Text.H6 weight={400}>
                                Note that prefill value will replace the
                                pre-selected value, if present.
                            </Text.H6>
                        ),
                    }}
                    placeholder="Enter pre-selected value"
                    value={field.value || ""}
                    onChange={(e) => {
                        field.onChange(e.target.value);
                    }}
                />
            )}
            shouldUnregister={true}
        />
    );
};
