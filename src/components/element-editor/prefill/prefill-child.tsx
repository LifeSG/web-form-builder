import { Form } from "@lifesg/react-design-system/form";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ChildEntry } from "src/components/common";
import { IPrefillAttributes } from "src/context-providers";
import { IBaseTextBasedFieldValues } from "src/schemas";
import { FieldWrapper } from "./prefill.styles";

interface IProps {
    onDelete: () => void;
    onChange: (newValue: IPrefillAttributes) => void;
    value?: IPrefillAttributes;
    index?: number;
}

export const PrefillChild = ({ onDelete, onChange, value, index }: IProps) => {
    // =============================================================================
    // CONST, STATE, REFS
    // =============================================================================
    const options = ["Myinfo", "Previous source"];
    const {
        formState: { errors },
        control,
        watch,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const [prefillMode, setPrefillMode] = useState<
        "Myinfo" | "Previous source" | ""
    >(value.prefillMode || "");
    const [actionId, setActionId] = useState<string>(value.actionId || "");
    const [path, setPath] = useState<string>(value.path || "");

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleChange = (
        changeType: string,
        newValue: "Myinfo" | "Previous source" | string
    ) => {
        const updatedValue: IPrefillAttributes = { ...value };

        const handleModeChange = (
            updatedValue: IPrefillAttributes,
            newValue: "Myinfo" | "Previous source"
        ) => {
            setPrefillMode(newValue);
            updatedValue.prefillMode = newValue;

            if (newValue === "Previous source") {
                setActionId("");
                updatedValue.actionId = "";
            } else if (
                newValue === "Myinfo" &&
                updatedValue.hasOwnProperty("actionId")
            ) {
                setActionId("");
                delete updatedValue.actionId;
            }
        };

        switch (changeType) {
            case "mode":
                if (newValue === "Myinfo" || newValue === "Previous source") {
                    handleModeChange(updatedValue, newValue);
                }
                break;
            case "actionId":
                setActionId(newValue);
                updatedValue.actionId = newValue;
                break;
            case "path":
                setPath(newValue);
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
                    <Controller
                        name={`prefill.${index}.prefillMode`}
                        control={control}
                        defaultValue={prefillMode}
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Select
                                    {...fieldWithoutRef}
                                    placeholder="Select"
                                    selectedOption={prefillMode}
                                    options={options}
                                    disabled={options.length === 1}
                                    onSelectOption={(option) => {
                                        handleChange("mode", option);
                                        fieldWithoutRef.onChange(option);
                                    }}
                                    errorMessage={
                                        errors?.prefill?.[index]?.prefillMode
                                            ?.message
                                    }
                                />
                            );
                        }}
                        shouldUnregister={true}
                    />
                </div>
                {value?.prefillMode === "Previous source" && (
                    <div>
                        {watch(
                            `prefill.${index}.prefillMode`,
                            "Previous source"
                        ) && (
                            <Controller
                                name={`prefill.${index}.actionId`}
                                control={control}
                                defaultValue={actionId}
                                render={({ field }) => {
                                    const { ref, ...fieldWithoutRef } = field;
                                    return (
                                        <Form.Input
                                            {...fieldWithoutRef}
                                            placeholder="Enter an action ID"
                                            defaultValue={actionId}
                                            onChange={(event) => {
                                                handleChange(
                                                    "actionId",
                                                    event.target.value
                                                );
                                                fieldWithoutRef.onChange(
                                                    event.target.value
                                                );
                                            }}
                                            errorMessage={
                                                errors?.prefill?.[index]
                                                    ?.actionId?.message
                                            }
                                        />
                                    );
                                }}
                                shouldUnregister={true}
                            />
                        )}
                    </div>
                )}

                <div>
                    <Controller
                        name={`prefill.${index}.path`}
                        control={control}
                        defaultValue={path}
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Input
                                    {...fieldWithoutRef}
                                    placeholder="Enter a path"
                                    defaultValue={path}
                                    onChange={(event) => {
                                        handleChange(
                                            "path",
                                            event.target.value
                                        );
                                        fieldWithoutRef.onChange(
                                            event.target.value
                                        );
                                    }}
                                    errorMessage={
                                        errors?.prefill?.[index]?.path?.message
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
