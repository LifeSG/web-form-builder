import { useCallback, useEffect, useState } from "react";
import { MultiEntry } from "src/components/common";
import { EElementType, IValidation, useBuilder } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import { ValidationChild } from "./validation-child";

export const Validation = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { focusedElement } = useBuilder();
    const element = focusedElement.element;
    const [childEntryValues, setChildEntryValues] = useState<IValidation[]>();

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
                return 6;
        }
    }

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleChildChange = (index: number, newValue: IValidation) => {
        setChildEntryValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index] = newValue;
            return updatedValues;
        });
    };

    const handleAddButtonClick = () => {
        setChildEntryValues((prevValues) => [
            ...prevValues,
            {
                validationType: "",
                validationRule: "",
                validationErrorMessage: "",
            },
        ]);
    };

    const handleDelete = (index: number) => {
        setChildEntryValues((prevValues) =>
            prevValues.filter((_, i) => i !== index)
        );
    };

    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        const element = focusedElement.element;
        setChildEntryValues(element.validation);
    }, [focusedElement.element]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = useCallback(() => {
        return childEntryValues?.map((child, index) => (
            <ValidationChild
                key={`validation-entry-${index}`}
                onDelete={() => handleDelete(index)}
                onChange={(newValue) => handleChildChange(index, newValue)}
                options={getOptionsByType(element.type)}
                value={child}
            />
        ));
    }, [childEntryValues, handleDelete, handleChildChange, element.type]);

    console.log("check child entry:", childEntryValues);

    return (
        <MultiEntry
            onAdd={handleAddButtonClick}
            title="Validation"
            buttonLabel="validation"
            disabledButton={
                childEntryValues?.length === getMaxEntries(element.type)
            }
        >
            {renderChildren()}
        </MultiEntry>
    );
};
