import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { TFormFieldValues } from "src/schemas";
import { MandatoryFieldBox, ToggleWrapper } from "../basic-details.styles";

export const MandatoryField = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext<TFormFieldValues>();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <MandatoryFieldBox>
            <ToggleWrapper>
                <Controller
                    name="required"
                    control={control}
                    render={({ field }) => (
                        <TogglePair
                            label={{
                                mainLabel: "Mandatory field",
                            }}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                    shouldUnregister={true}
                />
            </ToggleWrapper>
            {watch("required", true) && (
                <Controller
                    name="requiredErrorMsg"
                    control={control}
                    render={({ field }) => (
                        <Form.Input
                            {...field}
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
