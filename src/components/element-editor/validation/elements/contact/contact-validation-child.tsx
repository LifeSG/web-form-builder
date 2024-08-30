import { useFormContext } from "react-hook-form";
import { IContactFieldAttributes } from "src/context-providers";
import { ValidationErrorMessage, ValidationType } from "../../common";
import { FieldWrapper } from "../../validation.styles";
import { ChildEntry } from "./contact-validation-child.styles";
import { ContactValidationRule } from "./contact-validation-rule";

interface IProps {
    index: number;
    options: string[];
    disabled?: boolean;
}

export const ContactValidationChild = ({
    index,
    options,
    disabled,
}: IProps) => {
    const { watch } = useFormContext<IContactFieldAttributes>();
    const [defaultCountryCode, displayAsFixedCountryCode] = watch([
        "defaultCountryCode",
        "displayAsFixedCountryCode",
    ]);

    // =================================================================
    // RENDER FUNCTIONS
    // =================================================================
    return (
        <ChildEntry>
            <FieldWrapper data-testid="contact-validation-child">
                <ValidationType
                    index={index}
                    options={options}
                    disabled={disabled}
                />
                {defaultCountryCode === "65" && displayAsFixedCountryCode && (
                    <ContactValidationRule index={index} />
                )}
                <ValidationErrorMessage index={index} />
            </FieldWrapper>
        </ChildEntry>
    );
};
