import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { ChildEntry } from "src/components/common";
import { TFormFieldValues } from "src/yup-schemas";
import { FieldWrapper } from "./prefill.styles";

interface IProps {
    onDelete: () => void;
    index?: number;
}

export const PrefillChild = ({ onDelete, index }: IProps) => {
    // =============================================================================
    // CONST, STATE, REFS
    // =============================================================================
    const options = ["Myinfo", "Previous source"];
    const {
        formState: { errors },
        control,
        watch,
    } = useFormContext<TFormFieldValues>();

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
                        defaultValue={"Myinfo"}
                        render={({ field }) => {
                            const { ref, ...fieldWithoutRef } = field;
                            return (
                                <Form.Select
                                    {...fieldWithoutRef}
                                    placeholder="Select"
                                    selectedOption={fieldWithoutRef.value}
                                    options={options}
                                    disabled={options.length === 1}
                                    onSelectOption={(option) => {
                                        fieldWithoutRef.onChange(option);
                                    }}
                                    errorMessage={
                                        errors?.prefill?.[index]?.prefillMode
                                            ?.message
                                    }
                                />
                            );
                        }}
                    />
                </div>
                {watch(`prefill.${index}.prefillMode`) ===
                    "Previous source" && (
                    <div>
                        <Controller
                            name={`prefill.${index}.actionId`}
                            control={control}
                            render={({ field }) => {
                                const { ref, ...fieldWithoutRef } = field;
                                return (
                                    <Form.Input
                                        {...fieldWithoutRef}
                                        placeholder="Enter an action ID"
                                        value={fieldWithoutRef.value}
                                        onChange={(event) => {
                                            fieldWithoutRef.onChange(
                                                event.target.value
                                            );
                                        }}
                                        errorMessage={
                                            errors?.prefill?.[index]?.actionId
                                                ?.message
                                        }
                                    />
                                );
                            }}
                        />
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
                                    value={fieldWithoutRef.value}
                                    onChange={(event) => {
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
                    />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
