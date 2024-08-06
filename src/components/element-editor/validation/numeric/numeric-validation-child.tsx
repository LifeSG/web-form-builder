import { useFormContext } from "react-hook-form";
import { ChildEntry } from "src/components/common";
import { EValidationType } from "src/context-providers";
import { TOverallTextBasedSchema } from "src/schemas";
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

export const NumericValidationChild = ({
    onDelete,
    index,
    options,
    disabled,
}: IProps) => {
    // ===========================================================================
    // CONST, STATE, REF
    // ===========================================================================
    const { watch } = useFormContext<TOverallTextBasedSchema>();
    const validationType = watch(`validation.${index}.validationType`);

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
                {validationType !== EValidationType.WHOLE_NUMBERS && (
                    <ValidationRule index={index} />
                )}
                <ValidationErrorMessage index={index} />
            </FieldWrapper>
        </ChildEntry>
    );
};
