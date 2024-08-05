import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { EElementType } from "src/context-providers";
import { TOverallTextBasedSchema } from "src/schemas";

export const PreselectedValueTextBased = () => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================

    const {
        control,
        formState: { errors, defaultValues },
        getValues,
        setValue,
    } = useFormContext<TOverallTextBasedSchema>();

    // =========================================================================
    // EFFECTS
    // =========================================================================

    /** 1. In the scenario where a user first selects a dropdown field, preselectedValue is null.
     * When user changes the type to a text-based field and this component is rendered,
     * defaultValue of preselectedValue remains null. Current value of preselectedValue
     * remains null as well until it is edited. When the form is saved, a null value is submitted
     * and form would remain dirty forever if user attempts to edit the preselectedValue afterwards. */

    useEffect(() => {
        if (
            getValues("preselectedValue") === null ||
            defaultValues?.type === EElementType.DROPDOWN
        ) {
            setValue("preselectedValue", "", {
                shouldDirty: true,
            });
        }
    }, []);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="preselectedValue"
            control={control}
            render={({ field }) => {
                return (
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
                        errorMessage={errors?.preselectedValue?.message}
                    />
                );
            }}
            // shouldUnregister={true}
        />
    );
};
