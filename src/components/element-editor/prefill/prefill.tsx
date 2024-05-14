import { useEffect, useState } from "react";
import { MultiEntry } from "src/components/common";
import { IPrefill, useBuilder } from "src/context-providers";
import { PrefillChild } from "./prefill-child";

export const Prefill = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { focusedElement } = useBuilder();
    const element = focusedElement?.element;
    const [childEntryValues, setChildEntryValues] = useState<IPrefill[]>([]);

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleChildChange = (index: number, newValue: IPrefill) => {
        setChildEntryValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index] = newValue;
            return updatedValues;
        });
    };

    const handleAddButtonClick = () => {
        const prefillChild = {
            prefillMode: "",
            path: "",
        };

        setChildEntryValues((prevValues) => {
            const updatedValues = [...prevValues, prefillChild];
            return updatedValues;
        });
    };

    const handleDelete = (index: number) => {
        setChildEntryValues((prevValues) => {
            const updatedValues = prevValues.filter((_, i) => i !== index);
            return updatedValues;
        });
    };

    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        setChildEntryValues(element?.prefill);
    }, [focusedElement.element]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = () => {
        return childEntryValues?.map((child, index) => (
            <PrefillChild
                key={`validation-entry-${index}`}
                onDelete={() => handleDelete(index)}
                onChange={(newValue) => handleChildChange(index, newValue)}
                value={child}
            />
        ));
    };

    return (
        <MultiEntry
            onAdd={handleAddButtonClick}
            title="Prefill"
            buttonLabel="prefill"
            subtitle="Prefill information from various data sources, for example MyInfo."
        >
            {renderChildren()}
        </MultiEntry>
    );
};
