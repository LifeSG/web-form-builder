import { useCallback, useEffect, useState } from "react";
import { MultiEntry } from "src/components/common";
import { IConditionalRendering, useBuilder } from "src/context-providers";
import { ConditionalRenderingChild } from "./conditional-rendering-child";

interface IOptions {
    label?: string;
    id?: string;
    internalId?: string;
}

export const ConditionalRendering = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================

    const { focusedElement, elements } = useBuilder();
    const element = focusedElement.element;
    const [childEntryValues, setChildEntryValues] =
        useState<IConditionalRendering[]>();

    // =====================================================================
    // HELPER FUNCTIONS
    // =====================================================================

    const getElementOption = useCallback(() => {
        const options: IOptions[] = [];
        Object.entries(elements).forEach(([key, value]) => {
            if (key !== element.internalId) {
                const optionItem = {
                    label: value.label,
                    id: value.id,
                    internaleId: value.internalId,
                };
                options.push(optionItem);
            }
        });
        return options;
    }, [elements, element.internalId]);

    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        const element = focusedElement.element;
        setChildEntryValues(element.conditionalRendering);
    }, [focusedElement.element]);

    useEffect(() => {
        if (childEntryValues?.length >= 1) {
            const updatedChildEntries = childEntryValues?.filter((child) => {
                return Object.keys(child).some((id) => {
                    return elements?.hasOwnProperty(id);
                });
            });

            setChildEntryValues(updatedChildEntries);
        }
    }, [elements]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================

    const handleChildChange = (
        index: number,
        newValue: IConditionalRendering
    ) => {
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
                fieldKey: "",
                comparator: "",
                value: "",
                internalId: "",
            },
        ]);
    };

    const handleDelete = (index: number) => {
        setChildEntryValues((prevValues) =>
            prevValues.filter((_, i) => i !== index)
        );
    };

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const renderChildren = () => {
        return childEntryValues?.map((child, index) => (
            <ConditionalRenderingChild
                key={`conditional-rendering-entry-${index}`}
                onDelete={() => handleDelete(index)}
                onChange={(newValue) => handleChildChange(index, newValue)}
                options={getElementOption()}
                value={child}
            />
        ));
    };

    return (
        <MultiEntry
            onAdd={handleAddButtonClick}
            title="Conditional Rendering"
            buttonLabel="condition"
            disabledButton={getElementOption().length === 0}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
