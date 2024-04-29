import { Form } from "@lifesg/react-design-system";
import { useEffect, useState } from "react";
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
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const [type, setType] = useState<string>();

    // =============================================================================
    // EVENT HANLDERS
    // =============================================================================
    const handleChange = (changeType?: string, newValue?: string) => {
        const updatedValue = { ...value };
        if (!updatedValue.validationType || options.length === 1) {
            updatedValue.validationType = type;
        }
        if (changeType === "rule") {
            updatedValue.validationRule = newValue;
        } else if (changeType === "errorMessage") {
            updatedValue.validationErrorMessage = newValue;
        }

        onChange(updatedValue);
    };

    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        if (options.length === 1) {
            setType(options[0]);
        } else {
            setType(value.validationType);
        }
    }, [options]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <ChildEntry onDelete={onDelete}>
            <FieldWrapper>
                <div>
                    <Form.Select
                        placeholder="Select"
                        selectedOption={type}
                        options={options}
                        disabled={options.length === 1}
                        onSelectOption={(option) => {
                            if (options.length > 1) setType(option as string);
                        }}
                        onBlur={handleChange}
                    />
                </div>
                <div>
                    <Form.Textarea
                        placeholder="Enter rule"
                        defaultValue={value.validationRule}
                        onChange={(event) => {
                            event.preventDefault();
                            handleChange("rule", event.target.value);
                        }}
                    />
                </div>
                <div>
                    <Form.Input
                        placeholder="Set error message"
                        defaultValue={value.validationErrorMessage}
                        onChange={(event) => {
                            event.preventDefault();
                            handleChange("errorMessage", event.target.value);
                        }}
                    />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
