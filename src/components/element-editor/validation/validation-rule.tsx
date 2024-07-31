import { Form } from "@lifesg/react-design-system/form";
import { ControllerRenderProps, FieldErrors } from "react-hook-form";
import { EValidationType } from "src/context-providers";
import { TBaseTextBasedFieldValues } from "src/schemas";

interface IProps {
    fieldWithoutRef: Omit<
        ControllerRenderProps<
            TBaseTextBasedFieldValues,
            `validation.${number}.validationRule`
        >,
        "ref"
    >;
    index: number;
    validationType: string;
    errors?: FieldErrors<TBaseTextBasedFieldValues>;
}

export const ValidationRule: React.FC<IProps> = ({
    fieldWithoutRef,
    index,
    validationType,
    errors,
}) => {
    switch (validationType) {
        case EValidationType.EMAIL_DOMAIN:
            return (
                <Form.Textarea
                    {...fieldWithoutRef}
                    placeholder="Enter email domain, separating with a comma"
                    value={fieldWithoutRef.value}
                    onChange={(event) => {
                        fieldWithoutRef.onChange(event.target.value);
                    }}
                    errorMessage={
                        errors?.validation?.[index]?.validationRule?.message
                    }
                />
            );
        case EValidationType.WHOLE_NUMBERS:
            return null;
        default:
            return (
                <Form.Input
                    {...fieldWithoutRef}
                    placeholder="Enter rule"
                    value={fieldWithoutRef.value}
                    onChange={(event) => {
                        fieldWithoutRef.onChange(event.target.value);
                    }}
                    errorMessage={
                        errors?.validation?.[index]?.validationRule?.message
                    }
                />
            );
    }
};
