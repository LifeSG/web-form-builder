import { Form } from "@lifesg/react-design-system/form";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ChildEntry } from "src/components/common";
import { IValidation } from "src/context-providers/builder";
import { IBaseTextBasedFieldValues } from "src/schemas";
import { FieldWrapper } from "./validation.styles";

interface IProps {
    onDelete: () => void;
    options: string[];
    onChange: (newValue: any) => void;
    value?: IValidation;
    index?: number;
}

export const ValidationChild = ({
    onDelete,
    options,
    onChange,
    value,
    index,
}: IProps) => {
    const {
        formState: { errors },
        control,
        trigger,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const [validationRulePlaceHolder, setValidationRulePlaceHolder] =
        useState<string>();

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleChange = (changeType: string, newValue: string) => {
        const updatedValue = { ...value };
        switch (changeType) {
            case "type":
                updatedValue.validationType = newValue;
                break;
            case "rule":
                updatedValue.validationRule = newValue;
                break;
            case "errorMessage":
                updatedValue.validationErrorMessage = newValue;
                break;
            default:
                break;
        }
        onChange(updatedValue);
    };

    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        if (options.length === 1 && !value.validationType) {
            handleChange("type", options[0]);
        } else if (options.length === 1 && options[0] === "Email domain") {
            setValidationRulePlaceHolder(
                "Enter email domain, separating with a comma"
            );
        }
    }, [options, value?.validationType]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <ChildEntry onDelete={onDelete}>
            <FieldWrapper>
                <div>
                    <Controller
                        name={`validation.${index}.validationType`}
                        control={control}
                        defaultValue={value?.validationType || ""}
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Select
                                    {...fieldWithoutRef}
                                    placeholder="Select"
                                    selectedOption={value?.validationType}
                                    options={options}
                                    disabled={options.length === 1}
                                    onSelectOption={(option) => {
                                        handleChange("type", option);
                                        trigger(
                                            `validation.${index}.validationType`
                                        );
                                    }}
                                    errorMessage={
                                        errors?.validation?.[index]
                                            ?.validationType?.message
                                    }
                                />
                            );
                        }}
                        shouldUnregister={true}
                    />
                </div>
                <div>
                    <Controller
                        name={`validation.${index}.validationRule`}
                        control={control}
                        defaultValue={value?.validationRule || ""}
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Textarea
                                    {...fieldWithoutRef}
                                    placeholder={
                                        validationRulePlaceHolder
                                            ? validationRulePlaceHolder
                                            : "Enter rule"
                                    }
                                    onChange={(event) => {
                                        handleChange(
                                            "rule",
                                            event.target.value
                                        );
                                        trigger(
                                            `validation.${index}.validationRule`
                                        );
                                    }}
                                    errorMessage={
                                        errors?.validation?.[index]
                                            ?.validationRule?.message
                                    }
                                />
                            );
                        }}
                        shouldUnregister={true}
                    />
                </div>
                <div>
                    <Controller
                        name={`validation.${index}.validationErrorMessage`}
                        control={control}
                        defaultValue={value?.validationErrorMessage || ""}
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Input
                                    {...fieldWithoutRef}
                                    placeholder="Set error message"
                                    defaultValue={value?.validationErrorMessage}
                                    onChange={(event) => {
                                        handleChange(
                                            "errorMessage",
                                            event.target.value
                                        );
                                        trigger(
                                            `validation.${index}.validationErrorMessage`
                                        );
                                    }}
                                    errorMessage={
                                        errors?.validation?.[index]
                                            ?.validationErrorMessage?.message
                                    }
                                />
                            );
                        }}
                        shouldUnregister={true}
                    />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
