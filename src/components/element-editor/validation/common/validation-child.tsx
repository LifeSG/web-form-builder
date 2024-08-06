import { ChildEntry } from "src/components/common";
import {
    ValidationErrorMessage,
    ValidationRule,
    ValidationType,
} from "../common/";
import { FieldWrapper } from "../validation.styles";

interface IProps {
    onDelete: () => void;
    index: number;
    options: string[];
    disabled?: boolean;
}

export const ValidationChild = ({
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
            <FieldWrapper>
                <ValidationType
                    index={index}
                    options={options}
                    disabled={disabled}
                />
                <ValidationRule index={index} />
                <ValidationErrorMessage index={index} />
            </FieldWrapper>
        </ChildEntry>
    );
};
