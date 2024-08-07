import { ChildEntry } from "src/components/common";
import { FieldWrapper } from "../..";
import { ValidationErrorMessage, ValidationType } from "../../common/";
import { EmailValidationRule } from "./email-validation-rule";

interface IProps {
    onDelete: () => void;
    index: number;
    options: string[];
    disabled?: boolean;
}
export const EmailValidationChild = ({ onDelete, index, options }: IProps) => {
    // =================================================================
    // RENDER FUNCTIONS
    // =================================================================
    return (
        <ChildEntry onDelete={onDelete}>
            <FieldWrapper>
                <ValidationType
                    index={index}
                    options={options}
                    disabled={options.length === 1}
                />
                <EmailValidationRule index={index} />
                <ValidationErrorMessage index={index} />
            </FieldWrapper>
        </ChildEntry>
    );
};
