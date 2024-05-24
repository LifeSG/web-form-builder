import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { useEffect } from "react";
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
        trigger,
    } = useFormContext<IBaseTextBasedFieldValues>();

    // =============================================================================
    // EVENT HANLDERS
    // =============================================================================
    const handleChange = (
        changeType?: string,
        newValue?: string,
        internalId?: string
    ) => {
        const updatedValue = { ...value };
        switch (changeType) {
            case "fieldKey":
                updatedValue.fieldKey = newValue;
                updatedValue.internalId = internalId;
                break;
            case "comparator":
                updatedValue.comparator = newValue;
                break;
            case "value":
                updatedValue.value = newValue;
                break;
            default:
                break;
        }

        onChange(updatedValue);
    };

    // =========================================================================
    // USE EFFECT
    // =========================================================================

    useEffect(() => {
        if (value?.comparator) {
            handleChange("comparator", value?.comparator);
        } else {
            handleChange("comparator", comparatorOptions[0]);
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
                            defaultValue={value?.fieldKey || ""}
                            render={({ field }) => {
                                const { ref, ...fieldWithoutRef } = field;
                                return (
                                    <SelectFieldWrapper
                                        {...fieldWithoutRef}
                                        placeholder="Select"
                                        selectedOption={
                                            value?.fieldKey
                                                ? options.find(
                                                      (option) =>
                                                          option.id ===
                                                          value.fieldKey
                                                  )
                                                : null
                                        }
                                        onSelectOption={(option: IOptions) => {
                                            handleChange(
                                                "fieldKey",
                                                option?.id,
                                                option?.internalId
                                            );
                                            trigger(
                                                `conditionalRendering.${index}.fieldKey`
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
                                        onBlur={() =>
                                            trigger(
                                                `conditionalRendering.${index}.fieldKey`
                                            )
                                        }
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
                            defaultValue={
                                (value?.comparator !== "" &&
                                    value?.comparator) ||
                                comparatorOptions[0]
                            }
                            render={({ field }) => {
                                const { ref, ...fieldWithoutRef } = field;
                                return (
                                    <SelectFieldWrapper
                                        {...fieldWithoutRef}
                                        selectedOption={
                                            value?.comparator
                                                ? value?.comparator
                                                : comparatorOptions[0]
                                        }
                                        onSelectOption={(option: string) => {
                                            handleChange("comparator", option);
                                            trigger(
                                                `conditionalRendering.${index}.comparator`
                                            );
                                        }}
                                        onBlur={() =>
                                            trigger(
                                                `conditionalRendering.${index}.comparator`
                                            )
                                        }
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
                        defaultValue={value?.value || ""}
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Input
                                    {...fieldWithoutRef}
                                    placeholder="Set value"
                                    defaultValue={value?.value}
                                    onChange={(event) => {
                                        handleChange(
                                            "value",
                                            event.target.value
                                        );
                                        trigger(
                                            `conditionalRendering.${index}.value`
                                        );
                                    }}
                                    onBlur={() =>
                                        trigger(
                                            `conditionalRendering.${index}.value`
                                        )
                                    }
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
