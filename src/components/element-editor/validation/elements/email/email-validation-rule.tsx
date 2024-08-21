import { Form } from "@lifesg/react-design-system/form";
import { Controller, useFormContext } from "react-hook-form";
import { TOverallTextBasedValues } from "src/yup-schemas";

interface IProps {
    index: number;
}

export const EmailValidationRule = ({ index }: IProps) => {
    // ===========================================================================
    // CONST, STATE, REF
    // ===========================================================================
    const {
        formState: { errors },
        control,
    } = useFormContext<TOverallTextBasedValues>();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Controller
            name={`validation.${index}.validationRule`}
            control={control}
            render={({ field }) => {
                return (
                    <Form.Textarea
                        {...field}
                        placeholder="Enter email domain, separating with a comma"
                        errorMessage={
                            errors?.validation?.[index]?.validationRule?.message
                        }
                    />
                );
            }}
        />
    );
};
