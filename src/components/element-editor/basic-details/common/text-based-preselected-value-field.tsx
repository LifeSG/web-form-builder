import { Form } from "@lifesg/react-design-system/form";
import { Typography } from "@lifesg/react-design-system/typography";
import { Controller, useFormContext } from "react-hook-form";
import {
    useBuilder,
    useIsAttributeDisabled,
    useIsElementDisabled,
    useShouldShowPrefill,
} from "src/context-providers";
import { TOverallTextBasedValues } from "src/yup-schemas";

export const TextBasedPreselectedValueField = () => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================

    const {
        control,
        formState: { errors },
    } = useFormContext<TOverallTextBasedValues>();
    const shouldShowPrefill = useShouldShowPrefill();
    const { focusedElement } = useBuilder();
    const isElementDisabled = useIsElementDisabled(
        focusedElement.element.id,
        focusedElement.element.type
    );
    const isAttributeDisabled = useIsAttributeDisabled(
        focusedElement,
        "preselectedValue"
    );
    const isDisabled = isElementDisabled || isAttributeDisabled;
    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="preselectedValue"
            control={control}
            render={({ field }) => (
                <Form.Input
                    disabled={isDisabled}
                    {...field}
                    data-testid="preselected-value-field"
                    label={{
                        children: "Pre-selected value (optional)",
                        subtitle: shouldShowPrefill ? (
                            <Typography.BodySM>
                                Note that prefill value will replace the
                                pre-selected value, if present.
                            </Typography.BodySM>
                        ) : null,
                    }}
                    placeholder="Enter pre-selected value"
                    value={field.value || ""}
                    errorMessage={errors.preselectedValue?.message}
                />
            )}
        />
    );
};
