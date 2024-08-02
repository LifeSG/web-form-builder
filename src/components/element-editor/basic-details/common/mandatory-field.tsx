import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { useBuilder } from "src/context-providers";
import { TFormFieldValues } from "src/schemas";
import { MandatoryFieldBox } from "../basic-details.styles";

export const MandatoryField = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const { focusedElement } = useBuilder();
    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext<TFormFieldValues>();

    const element = focusedElement.element;

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
                        label={{
                            mainLabel: "Mandatory field",
                        }}
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                        id={element.internalId}
                    />
                )}
                shouldUnregister={true}
            />

            {watch("required", true) && (
                <Controller
                    name="requiredErrorMsg"
                    control={control}
                    render={({ field }) => (
                        <Form.Input
                            {...field}
                            label="Error message"
                            value={field.value || ""}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }}
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
