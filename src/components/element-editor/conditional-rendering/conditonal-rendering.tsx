import { useEffect, useState } from "react";
import { MultiEntry } from "src/components/common";
import { IConditionalRendering, useBuilder } from "src/context-providers";
import {
    ConditionalRenderingChild,
    IOnChangeProps,
} from "./conditional-rendering-child";

interface IOptions {
    label: string;
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

    const getElementOptions = () => {
        const options: IOptions[] = [];
        Object.entries(elements).forEach(([key, value]) => {
            if (key !== element?.internalId) {
                const optionItem = {
                    label: value?.label,
                    id: value?.id,
                };
                options.push(optionItem);
            }
        });
        return options;
    };

    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        const element = focusedElement?.element;
        setChildEntryValues(element?.conditionalRendering);
    }, [focusedElement?.element]);

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
        const conditionalRenderingChild = {
            fieldKey: "",
            comparator: "",
            value: "",
            internalId: "",
        };
        setChildEntryValues((prevValues) => {
            const updatedValues = [...prevValues, conditionalRenderingChild];
            return updatedValues;
        });
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
                onChange={(newValue) =>
                    handleChildChange(index, newValue as IOnChangeProps)
                }
                options={getElementOptions()}
                value={child}
            />
        ));
    };

    return (
        <MultiEntry
            onAdd={handleAddButtonClick}
            title="Conditional Rendering"
            buttonLabel="condition"
            disabledButton={getElementOptions().length === 0}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
