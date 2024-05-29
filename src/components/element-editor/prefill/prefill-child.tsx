import { Form } from "@lifesg/react-design-system/form";
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
        trigger,
        watch,
    } = useFormContext<IBaseTextBasedFieldValues>();

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
            updatedValue.prefillMode = newValue;

            if (newValue === "Previous source") {
                updatedValue.actionId = "";
            } else if (
                newValue === "Myinfo" &&
                updatedValue.hasOwnProperty("actionId")
            ) {
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
                    <Controller
                        name={`prefill.${index}.prefillMode`}
                        control={control}
                        defaultValue={value?.prefillMode || null}
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Select
                                    {...fieldWithoutRef}
                                    placeholder="Select"
                                    selectedOption={value?.prefillMode}
                                    options={options}
                                    disabled={options.length === 1}
                                    onSelectOption={(option) => {
                                        handleChange("mode", option);
                                        trigger(`prefill.${index}.prefillMode`);
                                    }}
                                    onBlur={() =>
                                        trigger(`prefill.${index}.prefillMode`)
                                    }
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
                                defaultValue={value?.actionId}
                                render={({ field }) => {
                                    const { ref, ...fieldWithoutRef } = field;
                                    return (
                                        <Form.Input
                                            {...fieldWithoutRef}
                                            placeholder="Enter an action ID"
                                            defaultValue={value.actionId}
                                            onChange={(event) => {
                                                handleChange(
                                                    "actionId",
                                                    event.target.value
                                                );
                                                trigger(
                                                    `prefill.${index}.actionId`
                                                );
                                            }}
                                            onBlur={() =>
                                                trigger(
                                                    `prefill.${index}.actionId`
                                                )
                                            }
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
                        defaultValue={value?.path}
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Input
                                    {...fieldWithoutRef}
                                    placeholder="Enter a path"
                                    defaultValue={value?.path}
                                    onChange={(event) => {
                                        handleChange(
                                            "path",
                                            event.target.value
                                        );
                                        trigger(`prefill.${index}.path`);
                                    }}
                                    errorMessage={
                                        errors?.prefill?.[index]?.path?.message
                                    }
                                    onBlur={() =>
                                        trigger(`prefill.${index}.path`)
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
