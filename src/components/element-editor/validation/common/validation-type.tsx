import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TSchemasWithValidation } from "src/yup-schemas";

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
    } = useFormContext<TSchemasWithValidation>();
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
                        data-testid="validation-type"
                        placeholder="Select"
                        selectedOption={fieldWithoutRef.value}
                        options={options}
                        disabled={disabled}
                        onSelectOption={field.onChange}
                        errorMessage={
                            errors?.validation?.[index]?.validationType?.message
                        }
                    />
                );
            }}
        />
    );
};
