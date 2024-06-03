import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ChildEntry } from "src/components/common";
import { IConditionalRendering } from "src/context-providers";
import { IBaseTextBasedFieldValues } from "src/schemas";
import {
    FieldWrapper,
    OptionIDText,
    SelectFieldContainer,
    SelectFieldWrapper,
} from "./conditional-rendering.styles";

export interface IOptions {
    label: string;
    id?: string;
    internalId?: string;
}

export interface IOnChangeProps {
    fieldKey: string;
    comparator: string;
    value: string | number;
    internalId: string;
}

interface IProps {
    onDelete: () => void;
    options: IOptions[];
    onChange: (newValue: IOnChangeProps | {}) => void;
    value?: IConditionalRendering;
    index?: number;
}

export const ConditionalRenderingChild = ({
    onDelete,
    options,
    onChange,
    value,
    index,
}: IProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================

    const comparatorOptions = [
        "Equals",
        "More than",
        "Less than",
        "Not equals",
    ];

    const {
        formState: { errors },
        control,
        getValues,
        setValue,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const comparator = getValues(`validation.${index}.validationType`) === "";

    // =========================================================================
    // USE EFFECT
    // =========================================================================

    useEffect(() => {
        if (comparator) {
            setValue(
                `conditionalRendering.${index}.comparator`,
                comparatorOptions[0]
            );
        }
    }, []);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <ChildEntry onDelete={onDelete}>
            <FieldWrapper>
                <SelectFieldContainer>
                    <div>
                        <Controller
                            name={`conditionalRendering.${index}.fieldKey`}
                            control={control}
                            render={({ field }) => {
                                const { ref, ...fieldWithoutRef } = field;
                                return (
                                    <SelectFieldWrapper
                                        {...fieldWithoutRef}
                                        placeholder="Select"
                                        selectedOption={
                                            fieldWithoutRef.value
                                                ? options.find(
                                                      (option) =>
                                                          option.id ===
                                                          fieldWithoutRef.value
                                                  )
                                                : null
                                        }
                                        onSelectOption={(option: IOptions) => {
                                            fieldWithoutRef.onChange(
                                                option?.id
                                            );
                                        }}
                                        options={options}
                                        renderCustomSelectedOption={(
                                            option: IOptions
                                        ) => {
                                            return (
                                                <Text.Body>
                                                    {option?.label}
                                                </Text.Body>
                                            );
                                        }}
                                        renderListItem={(option: IOptions) => {
                                            return (
                                                <div>
                                                    <Text.Body>
                                                        {option?.label}
                                                    </Text.Body>
                                                    <OptionIDText>
                                                        ID: {option?.id}
                                                    </OptionIDText>
                                                </div>
                                            );
                                        }}
                                        errorMessage={
                                            (errors &&
                                                errors.conditionalRendering &&
                                                errors?.conditionalRendering[
                                                    index
                                                ]?.fieldKey?.message) ||
                                            ""
                                        }
                                    />
                                );
                            }}
                            shouldUnregister={true}
                        />
                    </div>
                    <div>
                        <Controller
                            name={`conditionalRendering.${index}.comparator`}
                            control={control}
                            render={({ field }) => {
                                const { ref, ...fieldWithoutRef } = field;
                                return (
                                    <SelectFieldWrapper
                                        {...fieldWithoutRef}
                                        selectedOption={fieldWithoutRef.value}
                                        onSelectOption={(option: string) => {
                                            fieldWithoutRef.onChange(option);
                                        }}
                                        options={comparatorOptions}
                                        errorMessage={
                                            (errors &&
                                                errors.conditionalRendering &&
                                                errors?.conditionalRendering[
                                                    index
                                                ]?.comparator?.message) ||
                                            ""
                                        }
                                    />
                                );
                            }}
                            shouldUnregister={true}
                        />
                    </div>
                </SelectFieldContainer>
                <div>
                    <Controller
                        name={`conditionalRendering.${index}.value`}
                        control={control}
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Input
                                    {...fieldWithoutRef}
                                    placeholder="Set value"
                                    value={fieldWithoutRef.value}
                                    onChange={(event) => {
                                        fieldWithoutRef.onChange(
                                            event.target.value
                                        );
                                    }}
                                    errorMessage={
                                        errors &&
                                        errors?.conditionalRendering &&
                                        errors?.conditionalRendering[index]
                                            ?.value?.message
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
