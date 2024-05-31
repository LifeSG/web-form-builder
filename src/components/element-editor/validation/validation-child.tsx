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
        setValue,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const [validationRulePlaceHolder, setValidationRulePlaceHolder] =
        useState<string>();
    const [validation, setValidation] = useState<IValidation>(value);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleChange = (
        changeType:
            | "validationType"
            | "validationRule"
            | "validationErrorMessage",
        newValue: string,
        field?: { onChange: (arg0: string) => void }
    ) => {
        const updatedValue = { ...value, [changeType]: newValue };

        setValidation(updatedValue);
        onChange(updatedValue);
        field?.onChange(newValue);
    };

    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        if (options.length === 1 && !value.validationType) {
            handleChange("validationType", options[0]);
        } else if (options.length === 1 && options[0] === "Email domain") {
            setValidationRulePlaceHolder(
                "Enter email domain, seperating with a comma"
            );
        }
    }, [options, value?.validationType]);

    // =============================================================================
    // USE EFFECTS
    // =============================================================================

    useEffect(() => {
        if (value) {
            setValue(
                `validation.${index}.validationType`,
                value.validationType
            );
            setValue(
                `validation.${index}.validationRule`,
                value.validationRule
            );
            setValue(
                `validation.${index}.validationErrorMessage`,
                value.validationErrorMessage
            );
        }
    }, []);

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
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Select
                                    {...fieldWithoutRef}
                                    placeholder="Select"
                                    selectedOption={validation?.validationType}
                                    options={options}
                                    disabled={options.length === 1}
                                    onSelectOption={(option) => {
                                        handleChange(
                                            "validationType",
                                            option,
                                            fieldWithoutRef
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
                                    value={validation.validationRule}
                                    onChange={(event) => {
                                        handleChange(
                                            "validationRule",
                                            event.target.value,
                                            fieldWithoutRef
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
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Input
                                    {...fieldWithoutRef}
                                    placeholder="Set error message"
                                    value={validation?.validationErrorMessage}
                                    onChange={(event) => {
                                        handleChange(
                                            "validationErrorMessage",
                                            event.target.value,
                                            fieldWithoutRef
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
