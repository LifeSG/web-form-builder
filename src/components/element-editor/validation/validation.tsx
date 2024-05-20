import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import {
    EElementType,
    EPopoverReason,
    IValidation,
    useBuilder,
} from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import { IBaseTextBasedFieldValues } from "src/schemas";
import { ValidationChild } from "./validation-child";

export const Validation = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { focusedElement, updateFocusedElement } = useBuilder();
    const element = focusedElement.element;
    const [childEntryValues, setChildEntryValues] = useState<IValidation[]>([]);
    const {
        setValue,
        formState: { isDirty, errors, touchedFields },
        getValues,
    } = useFormContext<IBaseTextBasedFieldValues>();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    function getOptionsByType(elementType: EElementType) {
        switch (elementType) {
            case EElementType.EMAIL:
                return ELEMENT_VALIDATION_TYPES["Text field"][
                    EElementType.EMAIL
                ].validationTypes;
            default:
                return ["Select", "Type 1"];
        }
    }

    function getMaxEntries(elementType: EElementType) {
        switch (elementType) {
            case EElementType.EMAIL:
                return ELEMENT_VALIDATION_TYPES["Text field"][
                    EElementType.EMAIL
                ].maxEntries;
            default:
                return 6; // this is a arbitary value will be changed later on
        }
    }

    function getTouchedAndErrorsFields() {
        let count = 0;
        let hasEmptyField = false;
        const validationFields = getValues("validation");

        if (touchedFields?.validation?.length > 0) {
            touchedFields.validation.forEach((field) => {
                count += Object.keys(field).length;
            });

            validationFields?.forEach((field) => {
                if (Object.values(field).includes("")) {
                    hasEmptyField = true;
                }
            });

            const hasValidationErrors = errors?.validation?.length > 0;
            const hasIncompleteFields =
                count !== childEntryValues.length * 3 &&
                hasEmptyField &&
                childEntryValues?.length > 0;

            return hasValidationErrors || hasIncompleteFields;
        } else {
            const hasValidationErrors = errors?.validation?.length !== 0;
            const noTouchedFieldsDefined =
                touchedFields?.validation?.length === undefined;
            const hasChildEntryValues = childEntryValues?.length > 0;

            return (
                hasValidationErrors &&
                noTouchedFieldsDefined &&
                hasChildEntryValues
            );
        }
    }

    function getPopoverReason() {
        if (getTouchedAndErrorsFields()) {
            return EPopoverReason.EMPTY_OR_INVALID;
        } else if (childEntryValues?.length === getMaxEntries(element.type)) {
            return EPopoverReason.MAX_ENTRY;
        }
    }

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleChildChange = (index: number, newValue: IValidation) => {
        setChildEntryValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index] = newValue;
            setValue("validation", updatedValues);
            return updatedValues;
        });
    };

    const handleAddButtonClick = () => {
        const validationChild = {
            validationType: "",
            validationRule: "",
            validationErrorMessage: "",
        };

        setChildEntryValues((prevValues) => {
            const updatedValues = [...prevValues, validationChild];
            setValue("validation", updatedValues);
            return updatedValues;
        });
    };

    const handleDelete = (index: number) => {
        setChildEntryValues((prevValues) => {
            const updatedValues = prevValues.filter((_, i) => i !== index);
            setValue("validation", updatedValues);
            return updatedValues;
        });
    };

    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        const element = focusedElement?.element;
        setChildEntryValues(
            element?.validation !== undefined ? element?.validation : []
        );
    }, [focusedElement.element]);

    useEffect(() => {
        setValue("validation", childEntryValues, {
            shouldDirty: true,
        });
    }, [childEntryValues]);

    useEffect(() => {
        if (isDirty) {
            updateFocusedElement(true);
        }
    }, [isDirty, updateFocusedElement]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = () => {
        return childEntryValues?.map((child, index) => (
            <ValidationChild
                key={`validation-entry-${index}`}
                onDelete={() => handleDelete(index)}
                onChange={(newValue) => handleChildChange(index, newValue)}
                options={getOptionsByType(element.type)}
                value={child}
                index={index}
            />
        ));
    };

    return (
        <MultiEntry
            onAdd={handleAddButtonClick}
            title="Validation"
            buttonLabel="validation"
            disabledButton={
                childEntryValues?.length === getMaxEntries(element.type) ||
                getTouchedAndErrorsFields()
            }
            popoverReason={getPopoverReason()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
