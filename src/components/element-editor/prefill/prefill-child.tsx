import { Form } from "@lifesg/react-design-system/form";
import { ChildEntry } from "src/components/common";
import { IPrefill } from "src/context-providers";
import { FieldWrapper } from "./prefill.styles";

interface IProps {
    onDelete: () => void;
    onChange: (newValue: IPrefill) => void;
    value?: IPrefill;
}

export const PrefillChild = ({ onDelete, onChange, value }: IProps) => {
    // =============================================================================
    // CONST, STATE, REFS
    // =============================================================================
    const options = ["myInfo", "Previous source"];

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleChange = (changeType: string, newValue: string) => {
        const updatedValue = { ...value };
        switch (changeType) {
            case "mode":
                updatedValue.prefillMode = newValue;
                if (newValue === "Previous source") {
                    updatedValue.actionId = "";
                } else if (
                    newValue === "myInfo" &&
                    updatedValue.hasOwnProperty("actionId")
                ) {
                    delete updatedValue.actionId;
                }
                break;
            case "actionId":
                updatedValue.actionId = newValue;
                break;
            case "path":
                updatedValue.path = newValue;
                break;
            default:
                break;
        }
        onChange(updatedValue);
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <ChildEntry onDelete={onDelete}>
            <FieldWrapper>
                <div>
                    <Form.Select
                        placeholder="Select"
                        selectedOption={value?.prefillMode}
                        options={options}
                        disabled={options.length === 1}
                        onSelectOption={(option) => {
                            handleChange("mode", option);
                        }}
                    />
                </div>
                <div>
                    {value?.prefillMode === "Previous source" && (
                        <Form.Input
                            placeholder="Enter an action ID"
                            defaultValue={value.actionId}
                            onChange={(event) => {
                                handleChange("actionId", event.target.value);
                            }}
                        />
                    )}
                </div>
                <div>
                    <Form.Input
                        placeholder="Enter a path"
                        defaultValue={value?.path}
                        onChange={(event) => {
                            handleChange("path", event.target.value);
                        }}
                    />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
