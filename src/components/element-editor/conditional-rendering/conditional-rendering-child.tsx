import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { useEffect } from "react";
import { ChildEntry } from "src/components/common";
import { IConditionalRendering } from "src/context-providers";
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
                        <SelectFieldWrapper
                            placeholder="Select"
                            selectedOption={
                                value?.fieldKey
                                    ? options.find(
                                          (option) =>
                                              option.id === value.fieldKey
                                      )
                                    : null
                            }
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
                                value?.comparator
                                    ? value?.comparator
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
                        defaultValue={value?.value}
                        onChange={(event) => {
                            handleChange("value", event.target.value);
                        }}
                    />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
