import { Form } from "@lifesg/react-design-system/form";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ChildEntry } from "src/components/common";
import { IValidation } from "src/context-providers/builder";
import { IBaseTextBasedFieldValues } from "src/schemas";
import { FieldWrapper } from "./validation.styles";

interface IProps {
    onDelete: () => void;
    options: string[];
    onChange: (newValue: any) => void;
    value?: IValidation;
    index?: number;
}

export const ValidationChild = ({
    onDelete,
    options,
    onChange,
    value,
    index,
}: IProps) => {
    const {
        formState: { errors },
        control,
    } = useFormContext<IBaseTextBasedFieldValues>();

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
    }, [options, value?.validationType]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <ChildEntry onDelete={onDelete}>
            <FieldWrapper>
                <div>
                    <Controller
                        name={`validation.${index}.validationType`}
                        control={control}
                        defaultValue={value?.validationType || ""}
                        render={({ field }) => (
                            <Form.Select
                                {...field}
                                placeholder="Select"
                                selectedOption={value?.validationType}
                                options={options}
                                disabled={options.length === 1}
                                onSelectOption={(option) => {
                                    handleChange("type", option);
                                }}
                                errorMessage={
                                    errors?.validation &&
                                    (errors?.validation[index]?.validationType
                                        ?.message as unknown as string)
                                }
                            />
                        )}
                        shouldUnregister={true}
                    />
                </div>
                <div>
                    <Controller
                        name={`validation.${index}.validationRule`}
                        control={control}
                        defaultValue={value?.validationRule || ""}
                        render={({ field }) => (
                            <Form.Textarea
                                {...field}
                                placeholder="Enter rule"
                                onChange={(event) => {
                                    handleChange("rule", event.target.value);
                                }}
                                errorMessage={
                                    errors?.validation &&
                                    (errors?.validation[index]?.validationRule
                                        ?.message as unknown as string)
                                }
                            />
                        )}
                        shouldUnregister={true}
                    />
                </div>
                <div>
                    <Controller
                        name={`validation.${index}.validationErrorMessage`}
                        control={control}
                        defaultValue={value?.validationErrorMessage || ""}
                        render={({ field }) => (
                            <Form.Input
                                {...field}
                                placeholder="Set error message"
                                defaultValue={value?.validationErrorMessage}
                                onChange={(event) => {
                                    handleChange(
                                        "errorMessage",
                                        event.target.value
                                    );
                                }}
                                errorMessage={
                                    errors?.validation &&
                                    (errors?.validation[index]
                                        ?.validationErrorMessage
                                        ?.message as unknown as string)
                                }
                            />
                        )}
                        shouldUnregister={true}
                    />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
