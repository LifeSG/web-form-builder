import { Form } from "@lifesg/react-design-system/form";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ChildEntry } from "src/components/common";
import { IBaseTextBasedFieldValues } from "src/schemas";
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
    } = useFormContext<IBaseTextBasedFieldValues>();
    const [validationRulePlaceHolder, setValidationRulePlaceHolder] =
        useState<string>();

    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        if (options.length === 1 && options[0] === "Email domain") {
            setValidationRulePlaceHolder(
                "Enter email domain, separating with a comma"
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
                                    selectedOption={fieldWithoutRef.value}
                                    options={options}
                                    disabled={options.length === 1}
                                    onSelectOption={(option) => {
                                        field.onChange(option);
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
                                    value={fieldWithoutRef.value}
                                    onChange={(event) => {
                                        fieldWithoutRef.onChange(
                                            event.target.value
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
                        shouldUnregister={true}
                    />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
