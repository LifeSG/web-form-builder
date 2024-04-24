import { Form } from "@lifesg/react-design-system";
import { useState } from "react";
import { ChildEntry } from "src/components/common";
import { FieldWrapper } from "./validation.styles";
import { IEntryProps } from "./validation";

interface IProps {
    onDelete: () => void;
    options: string[];
    onChange: (newValue: any) => void;
}

export const ValidationChild = ({ onDelete, options, onChange }: IProps) => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const [type, setType] = useState<string>(
        options.length === 1 ? options[0] : ""
    );

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleChange = (rule?: string, errorMessage?: string) => {
        const newValue = {
            type: type,
            rule: rule,
            errorMessage: errorMessage,
        };

        onChange((prevValue: IEntryProps[]) => {
            const prevValueWithSameType = prevValue.find(
                (value: IEntryProps) => value.type === type
            );
            if (prevValueWithSameType) {
                return prevValue.map((value: IEntryProps) =>
                    value.type === type ? { ...value, ...newValue } : value
                );
            } else {
                return [...prevValue, newValue];
            }
        });
    };

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
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
                        onChange={(event) => {
                            event.preventDefault();
                            handleChange(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <Form.Input
                        placeholder="Set error message"
                        onChange={(event) => {
                            event.preventDefault();
                            handleChange(event.target.value);
                        }}
                    />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
