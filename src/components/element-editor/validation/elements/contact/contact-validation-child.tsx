import { ValidationErrorMessage, ValidationType } from "../../common";
import { FieldWrapper } from "../../validation.styles";
import { ChildEntry } from "./contact-validation-child.styles";

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
                <ValidationErrorMessage index={index} />
            </FieldWrapper>
        </ChildEntry>
    );
};
