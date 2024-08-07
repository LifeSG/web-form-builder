import { Alert } from "@lifesg/react-design-system/alert";
import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { ChildEntry } from "src/components/common";
import { EElementType, useBuilder } from "src/context-providers";
import { TOverallTextBasedSchema } from "src/schemas";
import { ValidationRule } from "./validation-rule";
import { FieldWrapper } from "./validation.styles";

interface IProps {
    onDelete: () => void;
    options: string[];
    index?: number;
}

export const ValidationChild = ({ onDelete, options, index }: IProps) => {
    const {
        formState: { errors },
        control,
        watch,
    } = useFormContext<TOverallTextBasedSchema>();
    const { focusedElement, selectedElementType } = useBuilder();
    const validationType = watch(`validation.${index}.validationType`);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderAlert = () => {
        if (selectedElementType === EElementType.TEXTAREA) {
            return (
                <Alert type="info" showIcon>
                    Adding of this validation will result in character counter
                    displayed under the textarea.
                </Alert>
            );
        } else {
            return <></>;
        }
    };

    return (
        <ChildEntry onDelete={onDelete}>
            <FieldWrapper>
                <Controller
                    name={`validation.${index}.validationType`}
                    control={control}
                    render={({ field }) => {
                        const { ref, ...fieldWithoutRef } = field;
                        return (
                            <Form.Select
                                {...fieldWithoutRef}
                                placeholder="Select"
                                selectedOption={fieldWithoutRef.value}
                                options={options}
                                disabled={
                                    options.length === 1 &&
                                    (focusedElement.element.type ===
                                        EElementType.TEXTAREA ||
                                        focusedElement.element.type ===
                                            EElementType.EMAIL)
                                }
                                onSelectOption={(option) => {
                                    field.onChange(option);
                                }}
                                errorMessage={
                                    errors?.validation?.[index]?.validationType
                                        ?.message
                                }
                            />
                        );
                    }}
                />

                <Controller
                    name={`validation.${index}.validationRule`}
                    control={control}
                    render={({ field }) => {
                        const { ref, ...fieldWithoutRef } = field;
                        return (
                            <ValidationRule
                                fieldWithoutRef={{ ...fieldWithoutRef }}
                                index={index}
                                validationType={validationType}
                                errors={errors}
                            />
                        );
                    }}
                />

                <Controller
                    name={`validation.${index}.validationErrorMessage`}
                    control={control}
                    render={({ field }) => {
                        const { ref, ...fieldWithoutRef } = field;
                        return (
                            <Form.Input
                                {...fieldWithoutRef}
                                placeholder="Set error message"
                                value={fieldWithoutRef.value}
                                onChange={(event) => {
                                    field.onChange(event.target.value);
                                }}
                                errorMessage={
                                    errors?.validation?.[index]
                                        ?.validationErrorMessage?.message
                                }
                            />
                        );
                    }}
                />
                {renderAlert()}
            </FieldWrapper>
        </ChildEntry>
    );
};
