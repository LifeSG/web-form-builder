import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TSchemasWithValidation } from "src/schemas";

interface IProps {
    index: number;
}

export const ValidationErrorMessage = ({ index }: IProps) => {
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
            name={`validation.${index}.validationErrorMessage`}
            control={control}
            render={({ field }) => {
                const { ref, ...fieldWithoutRef } = field;
                return (
                    <Form.Input
                        {...fieldWithoutRef}
                        placeholder="Set error message"
                        errorMessage={
                            errors?.validation?.[index]?.validationErrorMessage
                                ?.message
                        }
                    />
                );
            }}
        />
    );
};
