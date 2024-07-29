import { Form } from "@lifesg/react-design-system/form";
import { ControllerRenderProps, FieldErrors } from "react-hook-form";
import { EElementType } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
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
        case ELEMENT_VALIDATION_TYPES["Text field"][EElementType.EMAIL]
            .validationTypes[0]:
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
        case ELEMENT_VALIDATION_TYPES["Text field"][EElementType.NUMERIC]
            .validationTypes[0]:
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
