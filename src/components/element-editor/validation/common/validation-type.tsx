import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TOverallTextBasedSchema } from "src/schemas";

interface IProps {
    options: string[];
    index: number;
    disabled?: boolean;
}

export const ValidationType = ({ options, index, disabled }: IProps) => {
    // ===========================================================================
    // CONST, STATE, REF
    // ===========================================================================
    const {
        formState: { errors },
        control,
    } = useFormContext<TOverallTextBasedSchema>();
    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Controller
            name={`validation.${index}.validationType`}
            control={control}
            render={({ field }) => {
                const { ref, ...fieldWithoutRef } = field;
                return (
                    <Form.Select
                        {...fieldWithoutRef}
                        placeholder="Select"
                        selectedOption={fieldWithoutRef.value}
                        options={options}
                        disabled={disabled}
                        onSelectOption={(option) => {
                            field.onChange(option);
                        }}
                        errorMessage={
                            errors?.validation?.[index]?.validationType?.message
                        }
                    />
                );
            }}
        />
    );
};
