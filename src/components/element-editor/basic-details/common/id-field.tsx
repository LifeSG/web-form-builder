import { Form } from "@lifesg/react-design-system/form";
import { Typography } from "@lifesg/react-design-system/typography";
import { Controller, useFormContext } from "react-hook-form";
import {
    useBuilder,
    useIsAttributeDisabled,
    useIsElementDisabled,
} from "src/context-providers";
import { TFormFieldValues } from "src/yup-schemas";

export const IdField = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const {
        control,
        formState: { errors },
    } = useFormContext<TFormFieldValues>();

    const { focusedElement } = useBuilder();
    const isElementDisabled = useIsElementDisabled(
        focusedElement?.element?.id,
        focusedElement?.element?.type
    );
    const isAttributeDisabled = useIsAttributeDisabled(focusedElement, "id");
    const isDisabled = isElementDisabled || isAttributeDisabled;

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="id"
            control={control}
            render={({ field }) => (
                <Form.Input
                    disabled={isDisabled}
                    {...field}
                    data-testid="id-field"
                    label={{
                        children: "ID",
                        subtitle: (
                            <Typography.BodySM>
                                ID is used to differentiate element from the
                                others in the UI schema.
                            </Typography.BodySM>
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
