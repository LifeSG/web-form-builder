import { Text } from "@lifesg/react-design-system";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import { EElementType, IValidation, useBuilder } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import { IBaseTextBasedFieldValues, SchemaHelper } from "src/schemas";
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
        formState: { isDirty },
        getValues,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const shouldUpdateFocusedElement =
        isDirty ||
        childEntryValues?.length > focusedElement?.element?.validation?.length;
    const schema = SchemaHelper.buildSchema(EElementType.EMAIL);
    const invalidAndEmptyFields = getTouchedAndErrorsFields();

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
        if (childEntryValues && childEntryValues.length > 0) {
            try {
                const validationSchema = schema.pick(["validation"]);
                const validationValues = getValues("validation");

                const validationResult = validationSchema.validateSync({
                    validation: validationValues,
                    abortEarly: false,
                });
                return !!validationResult ? false : true;
            } catch (error) {
                return error.errors.some((errorMessage: string | string[]) =>
                    errorMessage.includes("required")
                );
            }
        } else {
            return false;
        }
    }

    function getPopoverMessage() {
        if (invalidAndEmptyFields) {
            return (
                <Text.Body>
                    To add new validation, fill up existing validation first.
                </Text.Body>
            );
        } else if (childEntryValues?.length === getMaxEntries(element.type)) {
            return (
                <Text.Body>
                    Limit reached. To add new validation, remove existing ones
                    first.
                </Text.Body>
            );
        }
    }

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleChildChange = (index: number, newValue: IValidation) => {
        const updatedValues = [...childEntryValues];
        updatedValues[index] = newValue;
        setChildEntryValues(updatedValues);
        setValue("validation", updatedValues);
    };

    const handleAddButtonClick = () => {
        const validationChild = {
            validationType: "",
            validationRule: "",
            validationErrorMessage: "",
        };

        const updatedValues = [...childEntryValues, validationChild];
        setChildEntryValues(updatedValues);
        setValue("validation", updatedValues);
    };

    const handleDelete = (index: number) => {
        const currentValues = [...childEntryValues];
        const updatedValues = currentValues.filter((_, i) => i !== index);
        setChildEntryValues(updatedValues);
        setValue("validation", updatedValues);
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
        if (shouldUpdateFocusedElement) {
            updateFocusedElement(true);
        }
    }, [shouldUpdateFocusedElement]);
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
                invalidAndEmptyFields
            }
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
