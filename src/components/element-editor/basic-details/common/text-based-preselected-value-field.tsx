import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { Controller, useFormContext } from "react-hook-form";
import { TOverallTextBasedSchema } from "src/yup-schemas";

export const TextBasedPreselectedValueField = () => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================

    const {
        control,
        formState: { errors },
    } = useFormContext<TOverallTextBasedSchema>();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="preselectedValue"
            control={control}
            render={({ field }) => (
                <Form.Input
                    {...field}
                    data-testid="preselected-value-field"
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
                    errorMessage={errors.preselectedValue?.message}
                />
            )}
        />
    );
};