import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { IconDropdown } from "src/components/common/icon-dropdown";
import { TogglePair } from "src/components/common/toggle-pair/toggle-pair";
import { useBuilder } from "src/context-providers";
import { IBaseTextBasedFieldValues } from "src/schemas";
import {
    FieldEditorAccordionItem,
    MandatoryFieldBox,
} from "./basic-details.styles";

export const BasicDetails = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================

    const { focusedElement } = useBuilder();
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const element = focusedElement.element;

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
        <FieldEditorAccordionItem type="default" expanded title="Basic">
            <IconDropdown type={element?.type} id={element?.id} />
            {hasProperty("label") && (
                <Form.Textarea
                    required
                    label="Label"
                    rows={1}
                    placeholder="Element Name"
                    errorMessage={errors.label?.message}
                    maxLength={40}
                    value={element?.label}
                    {...register("label")}
                />
            )}
            <MandatoryFieldBox>
                <Controller
                    name="required"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                        <TogglePair
                            label="Mandatory field"
                            defaultValue={true}
                            onChange={(value) => field.onChange(value)}
                        />
                    )}
                />
                {watch("required", true) && (
                    <Form.Input
                        label="Error message"
                        errorMessage={errors.requiredErrorMsg?.message}
                        {...register("requiredErrorMsg")}
                    />
                )}
            </MandatoryFieldBox>
            <Form.Input
                {...register("id")}
                required
                label="ID"
                placeholder="Enter ID"
                errorMessage={errors.id?.message}
            />

            {hasProperty("placeholder") && (
                <Form.Input
                    label="Placeholder"
                    placeholder="Enter placeholder text"
                    errorMessage={errors.placeholder?.message}
                    {...register("placeholder")}
                />
            )}
        </FieldEditorAccordionItem>
    );
};
