import { Form } from "@lifesg/react-design-system/form";
import { V2_Text } from "@lifesg/react-design-system/v2_text";
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
        (<Controller
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
                            <V2_Text.H6 weight={400}>
                                ID is used to differentiate element from the
                                others in the UI schema.
                            </V2_Text.H6>
                        ),
                    }}
                    placeholder="Create an ID"
                    value={field.value || ""}
                    errorMessage={errors.id?.message}
                />
            )}
        />)
    );
};
