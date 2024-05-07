import { Form } from "@lifesg/react-design-system/form";
import { useEffect } from "react";
import { ChildEntry } from "src/components/common";
import { IValidation } from "src/context-providers/builder";
import { FieldWrapper } from "./validation.styles";

interface IProps {
    onDelete: () => void;
    options: string[];
    onChange: (newValue: any) => void;
    value?: IValidation;
}

export const ValidationChild = ({
    onDelete,
    options,
    onChange,
    value,
}: IProps) => {
    // =============================================================================
    // EVENT HANLDERS
    // =============================================================================
    const handleChange = (changeType?: string, newValue?: string) => {
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
        }
    }, [options, value.validationType]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <ChildEntry onDelete={onDelete}>
            <FieldWrapper>
                <div>
                    <Form.Select
                        placeholder="Select"
                        selectedOption={value.validationType}
                        options={options}
                        disabled={options.length === 1}
                        onSelectOption={(option) => {
                            handleChange("type", option);
                        }}
                    />
                </div>
                <div>
                    <Form.Textarea
                        placeholder="Enter rule"
                        defaultValue={value.validationRule}
                        onChange={(event) => {
                            handleChange("rule", event.target.value);
                        }}
                    />
                </div>
                <div>
                    <Form.Input
                        placeholder="Set error message"
                        defaultValue={value.validationErrorMessage}
                        onChange={(event) => {
                            handleChange("errorMessage", event.target.value);
                        }}
                    />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
