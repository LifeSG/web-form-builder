import { Button } from "@lifesg/react-design-system/button";
import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { useBuilder } from "src/context-providers";
import { IBaseTextBasedFieldValues } from "src/schemas";
import { MandatoryFieldBox } from "./basic-details.styles";

export const BasicDetails = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { focusedElement } = useBuilder();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const element = focusedElement.element;

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleClick = (values: any) => {};

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const hasProperty = (key: string) => {
        return key in element;
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <div>
            <Form.Input
                {...register("id")}
                required
                label="ID"
                placeholder="Enter ID"
                data-testid="id-field"
                errorMessage={errors.id?.message}
            />
            {hasProperty("label") && (
                <Form.Input
                    required
                    data-testid="label-field"
                    label="Label"
                    placeholder="Enter label"
                    errorMessage={errors.label?.message}
                    {...register("label")}
                />
            )}
            {hasProperty("placeholder") && (
                <Form.Input
                    label="Placeholder"
                    placeholder="Enter placeholder"
                    errorMessage={errors.placeholder?.message}
                    {...register("placeholder")}
                />
            )}
            <MandatoryFieldBox>
                <Controller
                    name="required"
                    control={control}
                    render={() => (
                        <TogglePair
                            label="Mandatory field"
                            onChange={(value) => setValue("required", value)}
                        />
                    )}
                />
                {watch("required") && (
                    <Form.Input
                        role="input"
                        data-testid="required-error-message-input"
                        label="Error message"
                        {...register("requiredErrorMsg")}
                    />
                )}
            </MandatoryFieldBox>
            <Button.Small onClick={handleSubmit(handleClick)}>
                Save
            </Button.Small>
        </div>
    );
};
