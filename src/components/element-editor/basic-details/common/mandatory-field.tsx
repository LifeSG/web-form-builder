import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import {
    useBuilder,
    useIsAttributeDisabled,
    useIsElementDisabled,
} from "src/context-providers";
import { TFormFieldValues } from "src/yup-schemas";
import { MandatoryFieldBox } from "./common.styles";

export const MandatoryField = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const { focusedElement } = useBuilder();
    const {
        control,
        formState: { errors },
        watch,
        resetField,
    } = useFormContext<TFormFieldValues>();
    const isDisabled = useIsElementDisabled(
        focusedElement.element.id,
        focusedElement.element.type
    );

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <MandatoryFieldBox>
            <Controller
                name="required"
                control={control}
                render={({ field }) => (
                    <TogglePair
                        disabled={isDisabled}
                        label={{
                            mainLabel: "Mandatory field",
                        }}
                        value={field.value}
                        onChange={(value) => {
                            if (value) {
                                setTimeout(() => {
                                    resetField("requiredErrorMsg", {
                                        defaultValue:
                                            focusedElement.element
                                                .requiredErrorMsg,
                                    });
                                });
                            }
                            field.onChange(value);
                        }}
                    />
                )}
            />
            {watch("required", true) && (
                <Controller
                    name="requiredErrorMsg"
                    control={control}
                    render={({ field }) => (
                        <Form.Input
                            disabled={isDisabled}
                            {...field}
                            data-testid="required-error-message-field"
                            label="Error message"
                            value={field.value || ""}
                            placeholder="Enter error message"
                            errorMessage={errors.requiredErrorMsg?.message}
                        />
                    )}
                    shouldUnregister={true}
                />
            )}
        </MandatoryFieldBox>
    );
};
