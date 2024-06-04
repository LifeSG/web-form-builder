import { Text } from "@lifesg/react-design-system";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import { EElementType, IValidation, useBuilder } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import { IBaseTextBasedFieldValues, SchemaHelper } from "src/schemas";
import { ValidationChild } from "./validation-child";
import * as Yup from "yup";

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
        if (element?.validation && element?.validation.length > 0) {
            try {
                const validationSchema = schema.pick(["validation"]);
                const validationValues = getValues("validation");

                validationSchema.validateSync({
                    validation: validationValues,
                    abortEarly: false,
                });
                return false;
            } catch (error) {
                return Yup.ValidationError.isError(error);
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
        } else if (
            element?.validation?.length === getMaxEntries(element.type)
        ) {
            return (
                <Text.Body>
                    Limit reached. To add new validation, remove existing ones
                    first.
                </Text.Body>
            );
        }
    }

    const setDefaultValidationType = () => {
        switch (element?.type) {
            case EElementType.EMAIL:
                return ELEMENT_VALIDATION_TYPES["Text field"][
                    EElementType.EMAIL
                ].validationTypes[0];
            default:
                return "";
        }
    };

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    // const handleChildChange = (index: number, newValue: IValidation) => {
    //     const updatedValues = [...childEntryValues];
    //     updatedValues[index] = newValue;
    //     setChildEntryValues(updatedValues);
    //     setValue("validation", updatedValues);
    // };

    const handleAddButtonClick = () => {
        const validationChild = {
            validationType: setDefaultValidationType(),
            validationRule: "",
            validationErrorMessage: "",
        };

        const updatedValues = [...element?.validation, validationChild];
        setChildEntryValues(updatedValues);
        setValue("validation", updatedValues);
    };

    const handleDelete = (index: number) => {
        const currentValues = [...element?.validation];
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
        setValue("validation", element?.validation, {
            shouldDirty: true,
        });
    }, [element?.validation]);

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
                options={getOptionsByType(element.type)}
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
                element?.validation?.length === getMaxEntries(element.type) ||
                invalidAndEmptyFields
            }
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
