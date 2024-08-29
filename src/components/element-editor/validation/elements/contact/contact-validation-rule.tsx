import { Form } from "@lifesg/react-design-system/form";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
    EValidationRuleFEEContact,
    IContactFieldAttributes,
    useBuilder,
} from "src/context-providers";

interface IProps {
    index: number;
}

interface IOptionsProps {
    title: string;
    label: string;
    value: EValidationRuleFEEContact;
}

export const ContactValidationRule = ({ index }: IProps) => {
    // ===========================================================================
    // CONST, STATE, REF
    // ===========================================================================
    const {
        formState: { errors },
        control,
        setValue,
    } = useFormContext<IContactFieldAttributes>();
    const { focusedElement } = useBuilder();
    const element = focusedElement?.element as IContactFieldAttributes;

    const options: IOptionsProps[] = [
        {
            title: "All",
            label: "First digit of 3, 6, 8 or 9 allowed with correct length.",
            value: EValidationRuleFEEContact.DEFAULT,
        },
        {
            title: "Landline contact number only",
            label: "First digit of 3 or 6 allowed with correct length.",
            value: EValidationRuleFEEContact.HOUSE,
        },
        {
            title: "Mobile contact number only",
            label: "First digit of 8 or 9 allowed with correct length.",
            value: EValidationRuleFEEContact.MOBILE,
        },
    ];

    // =========================================================================
    // EFFECTS
    // =========================================================================

    useEffect(() => {
        setValue(
            "validation.0.validationRule",
            EValidationRuleFEEContact.DEFAULT
        );
    }, []);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Controller
            name={`validation.${index}.validationRule`}
            control={control}
            render={({ field }) => {
                const { ref, ...fieldWithoutRef } = field;
                return (
                    <Form.Select
                        {...fieldWithoutRef}
                        data-testid="contact-validation-rule"
                        placeholder="Select"
                        selectedOption={options?.find(
                            (option) => option.value === field.value
                        )}
                        options={options}
                        listExtractor={(option) => ({
                            title: option.title,
                            secondaryLabel: option.label,
                        })}
                        displayValueExtractor={(option) =>
                            `${option.title} (${option.label})`
                        }
                        onSelectOption={(option) =>
                            field.onChange(option.value)
                        }
                        errorMessage={
                            errors?.validation?.[index]?.validationRule?.message
                        }
                    />
                );
            }}
            shouldUnregister
        />
    );
};
