import { Form } from "@lifesg/react-design-system/form";
import { Typography } from "@lifesg/react-design-system/typography";
import { Controller, useFormContext } from "react-hook-form";
import { ChildEntry } from "src/components/common";
import {
    EConditionType,
    EElementType,
    useShouldShowField,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TFormFieldValues } from "src/yup-schemas";
import {
    FieldWrapper,
    OptionIDText,
    SelectFieldContainer,
    SelectFieldWrapper,
} from "./conditional-rendering.styles";

export interface IOptions {
    label: string;
    elementType?: EElementType;
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
    index?: number;
}

export const ConditionalRenderingChild = ({
    onDelete,
    options,
    index,
}: IProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================

    const comparatorOptions = [
        EConditionType.EQUALS,
        EConditionType.MORE_THAN,
        EConditionType.LESS_THAN,
        EConditionType.NOT_EQUALS,
    ];

    const {
        formState: { errors },
        control,
        setValue,
    } = useFormContext<TFormFieldValues>();

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
                                            setValue(
                                                `conditionalRendering.${index}.internalId`,
                                                option.internalId
                                            );
                                        }}
                                        options={options}
                                        renderCustomSelectedOption={(
                                            option: IOptions
                                        ) => {
                                            return (
                                                <Typography.BodyBL>
                                                    {option?.label}
                                                </Typography.BodyBL>
                                            );
                                        }}
                                        renderListItem={(option: IOptions) => {
                                            const isIdVisible =
                                                useShouldShowField(
                                                    "id",
                                                    ELEMENT_BUTTON_LABELS[
                                                        option.elementType
                                                    ]
                                                );
                                            return (
                                                <div>
                                                    <Typography.BodyBL>
                                                        {option?.label}
                                                    </Typography.BodyBL>
                                                    {isIdVisible && (
                                                        <OptionIDText>
                                                            ID: {option?.id}
                                                        </OptionIDText>
                                                    )}
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
                    />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
