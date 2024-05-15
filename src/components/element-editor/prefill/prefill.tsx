import { useEffect, useState } from "react";
import { MultiEntry } from "src/components/common";
import { IPrefill, useBuilder } from "src/context-providers";
import { PrefillChild } from "./prefill-child";
import { useFormContext } from "react-hook-form";
import { IBaseTextBasedFieldValues } from "src/schemas";

export const Prefill = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { focusedElement, updateFocusedElement } = useBuilder();
    const element = focusedElement?.element;
    const [childEntryValues, setChildEntryValues] = useState<IPrefill[]>([]);
    const {
        setValue,
        formState: { isDirty },
    } = useFormContext<IBaseTextBasedFieldValues>();

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleChildChange = (index: number, newValue: IPrefill) => {
        setChildEntryValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index] = newValue;
            setValue("prefill", updatedValues);
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
            setValue("prefill", updatedValues);
            return updatedValues;
        });
    };

    const handleDelete = (index: number) => {
        setChildEntryValues((prevValues) => {
            const updatedValues = prevValues.filter((_, i) => i !== index);
            setValue("prefill", updatedValues);
            return updatedValues;
        });
    };

    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        setChildEntryValues(element?.prefill);
    }, [focusedElement.element]);

    useEffect(() => {
        setValue("prefill", childEntryValues, {
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
            <PrefillChild
                key={`prefill-entry-${index}`}
                onDelete={() => handleDelete(index)}
                onChange={(newValue) => handleChildChange(index, newValue)}
                value={child}
                index={index}
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
