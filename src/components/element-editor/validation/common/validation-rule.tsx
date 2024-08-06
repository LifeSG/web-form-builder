import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TOverallTextBasedSchema } from "src/schemas";

interface IProps {
    index: number;
}

export const ValidationRule = ({ index }: IProps) => {
    const {
        formState: { errors },
        control,
    } = useFormContext<TOverallTextBasedSchema>();
    return (
        <Controller
            name={`validation.${index}.validationRule`}
            control={control}
            render={({ field }) => {
                const { ref, ...fieldWithoutRef } = field;
                return (
                    <Form.Input
                        {...fieldWithoutRef}
                        placeholder="Enter rule"
                        errorMessage={
                            errors?.validation?.[index]?.validationRule?.message
                        }
                    />
                );
            }}
        />
    );
};
