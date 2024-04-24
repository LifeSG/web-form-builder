import { useState } from "react";
import { MultiEntry } from "src/components/common";
import { ValidationChild } from "./validation-child";
import { EElementType, useBuilder } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import { SimpleIdGenerator } from "src/util/simple-id-generator";

export interface IEntryProps {
    type?: string;
    rule?: string;
    errorMessage?: string;
}

export const Validation = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { focusedElement } = useBuilder();
    const element = focusedElement.element;
    const [numberOfChildEntry, setNumberOfChildEntry] = useState(0);
    const [childEntryValues, setChildEntryValues] = useState<IEntryProps[]>([]);
    const [childKey, setChildKey] = useState([]);

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    function getOptionsByType(elementType: EElementType) {
        switch (elementType) {
            case EElementType.EMAIL:
                return ELEMENT_VALIDATION_TYPES["Text field"][
                    EElementType.EMAIL
                ];
            default:
                return ["Select", "Type 1"];
        }
    }

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleAddButtonClick = () => {
        const newKey = SimpleIdGenerator.generate();
        setChildKey((prevValue) => [...prevValue, newKey]);

        setNumberOfChildEntry((num) => num + 1);
    };

    const handleBinIconClick = (type: string) => {
        if (childEntryValues.length > 0) {
            const updatedValues = childEntryValues.filter(
                (child) => child?.type !== type
            );
            const childToRemove = childEntryValues.find(
                (child) => child?.type === type
            );
            const updatedKeys = childKey.filter(
                (_, index) => index !== childEntryValues.indexOf(childToRemove)
            );

            setChildEntryValues(updatedValues);
            setChildKey(updatedKeys);
            setNumberOfChildEntry((num) => num - 1);
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderChildren = () => {
        return Array.from(
            {
                length: numberOfChildEntry,
            },
            (_, index) => {
                return (
                    <ValidationChild
                        key={childKey[index]}
                        onDelete={() =>
                            handleBinIconClick(childEntryValues[index].type)
                        }
                        onChange={setChildEntryValues}
                        options={getOptionsByType(element.type)}
                    />
                );
            }
        );
    };

    console.log("check state of values: ", childEntryValues);

    return (
        <MultiEntry
            onAdd={handleAddButtonClick}
            title="Validation"
            buttonLabel="validation"
            disabledButton={
                numberOfChildEntry === getOptionsByType(element.type).length
            }
        >
            {renderChildren()}
        </MultiEntry>
    );
};
