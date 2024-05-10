import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { useEffect } from "react";
import { ChildEntry } from "src/components/common";
import { IConditionalRendering, useBuilder } from "src/context-providers";
import {
    FieldWrapper,
    OptionIDText,
    SelectFieldContainer,
    SelectFieldWrapper,
} from "./conditional-rendering.styles";

export interface IOptions {
    label?: string;
    id?: string;
}

interface IProps {
    onDelete: () => void;
    options: IOptions[];
    onChange: (newValue: any) => void;
    value?: IConditionalRendering;
}

export const ConditionalRenderingChild = ({
    onDelete,
    options,
    onChange,
    value,
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

    const { focusedElement } = useBuilder();

    // =============================================================================
    // EVENT HANLDERS
    // =============================================================================

    const handleChange = (changeType?: string, newValue?: string) => {
        const updatedValue = { ...value };
        if (focusedElement && focusedElement.element) {
            const internalId = focusedElement.element.internalId;

            switch (changeType) {
                case "fieldKey":
                    updatedValue[internalId] = {
                        ...updatedValue[internalId],
                        fieldKey: newValue,
                    };
                    break;
                case "comparator":
                    updatedValue[internalId] = {
                        ...updatedValue[internalId],
                        comparator: newValue,
                    };
                    break;
                case "value":
                    updatedValue[internalId] = {
                        ...updatedValue[internalId],
                        value: newValue,
                    };
                    break;
                default:
                    break;
            }
        }

        onChange(updatedValue);
    };

    // =========================================================================
    // USE EFFECT
    // =========================================================================

    useEffect(() => {
        if (value[focusedElement.element.internalId].comparator) {
            handleChange(
                "comparator",
                value[focusedElement.element.internalId].comparator
            );
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
                        <SelectFieldWrapper
                            placeholder="Select"
                            selectedOption={options.find(
                                (option) =>
                                    option?.id ===
                                    value[focusedElement.element.internalId]
                                        .fieldKey
                            )}
                            onSelectOption={(option: IOptions) => {
                                handleChange("fieldKey", option?.id);
                            }}
                            options={options}
                            renderCustomSelectedOption={(option: IOptions) => {
                                return <Text.Body>{option?.label}</Text.Body>;
                            }}
                            renderListItem={(option: IOptions) => {
                                return (
                                    <div>
                                        <Text.Body>{option?.label}</Text.Body>
                                        <OptionIDText>
                                            ID: {option?.id}
                                        </OptionIDText>
                                    </div>
                                );
                            }}
                        />
                    </div>
                    <div>
                        <SelectFieldWrapper
                            selectedOption={
                                value[focusedElement.element.internalId]
                                    .comparator
                                    ? value[focusedElement.element.internalId]
                                          .comparator
                                    : comparatorOptions[0]
                            }
                            onSelectOption={(option: string) => {
                                handleChange("comparator", option);
                            }}
                            options={comparatorOptions}
                        />
                    </div>
                </SelectFieldContainer>
                <div>
                    <Form.Input
                        placeholder="Set value"
                        defaultValue={
                            value[focusedElement.element.internalId].value
                        }
                        onChange={(event) => {
                            handleChange("value", event.target.value);
                        }}
                    />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
