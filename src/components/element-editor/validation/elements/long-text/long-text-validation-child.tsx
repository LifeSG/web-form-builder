import { Alert } from "@lifesg/react-design-system/alert";
import { ChildEntry } from "src/components/common";
import { FieldWrapper } from "../..";
import {
    ValidationErrorMessage,
    ValidationRule,
    ValidationType,
} from "../../common";

interface IProps {
    onDelete: () => void;
    index: number;
    options: string[];
    disabled?: boolean;
}

export const LongTextValidationChild = ({
    onDelete,
    index,
    options,
    disabled,
}: IProps) => {
    // =================================================================
    // RENDER FUNCTIONS
    // =================================================================
    return (
        <ChildEntry onDelete={onDelete}>
            <FieldWrapper data-testid="long-text-validation-child">
                <ValidationType
                    index={index}
                    options={options}
                    disabled={disabled}
                />
                <ValidationRule index={index} />
                <ValidationErrorMessage index={index} />
                <Alert type="info" showIcon>
                    Adding of this validation will result in character counter
                    displayed under the textarea.
                </Alert>
            </FieldWrapper>
        </ChildEntry>
    );
};
