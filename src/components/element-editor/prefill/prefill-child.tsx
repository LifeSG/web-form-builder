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
    const [prefill, setPrefill] = useState<IPrefillAttributes>(
        value || { prefillMode: "", path: "" }
    );

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const handleModeChange = (newValue: "Myinfo" | "Previous source") => {
        const updatedPrefill = { ...prefill, prefillMode: newValue };

        if (newValue === "Previous source") {
            updatedPrefill.actionId = "";
        } else if (newValue === "Myinfo" && prefill.actionId !== undefined) {
            delete updatedPrefill.actionId;
        }

        setPrefill(updatedPrefill);
        onChange(updatedPrefill);
    };

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleChange = (
        changeType: "mode" | "actionId" | "path",
        newValue: string,
        field?: { onChange: (arg0: string) => void }
    ) => {
        if (
            changeType === "mode" &&
            (newValue === "Myinfo" || newValue === "Previous source")
        ) {
            handleModeChange(newValue as "Myinfo" | "Previous source");
        } else {
            const updatedPrefill = { ...prefill, [changeType]: newValue };
            setPrefill(updatedPrefill);
            onChange(updatedPrefill);
        }

        field?.onChange(newValue);
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
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Select
                                    {...fieldWithoutRef}
                                    placeholder="Select"
                                    selectedOption={prefill.prefillMode}
                                    options={options}
                                    disabled={options.length === 1}
                                    onSelectOption={(option) => {
                                        handleChange(
                                            "mode",
                                            option,
                                            fieldWithoutRef
                                        );
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
                                render={({ field }) => {
                                    const { ref, ...fieldWithoutRef } = field;
                                    return (
                                        <Form.Input
                                            {...fieldWithoutRef}
                                            placeholder="Enter an action ID"
                                            defaultValue={prefill.actionId}
                                            onChange={(event) => {
                                                handleChange(
                                                    "actionId",
                                                    event.target.value,
                                                    fieldWithoutRef
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
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Input
                                    {...fieldWithoutRef}
                                    placeholder="Enter a path"
                                    defaultValue={prefill.path}
                                    onChange={(event) => {
                                        handleChange(
                                            "path",
                                            event.target.value,
                                            fieldWithoutRef
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
