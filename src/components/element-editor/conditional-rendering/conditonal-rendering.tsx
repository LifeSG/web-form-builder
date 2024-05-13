import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import { IConditionalRendering, useBuilder } from "src/context-providers";
import { IBaseTextBasedFieldValues } from "src/schemas";
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

    const { focusedElement, elements, updateFocusedElement } = useBuilder();
    const element = focusedElement.element;
    const [childEntryValues, setChildEntryValues] =
        useState<IConditionalRendering[]>();
    const {
        setValue,
        formState: { isDirty },
    } = useFormContext<IBaseTextBasedFieldValues>();

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
                    internalId: value.internalId,
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

        if (element.conditionalRendering?.length >= 1) {
            const updatedChildEntries = element.conditionalRendering?.filter(
                (child) => {
                    return elements?.hasOwnProperty(child.internalId);
                }
            );
            setValue("conditionalRendering", updatedChildEntries);
            setChildEntryValues(updatedChildEntries);
        } else {
            setValue("conditionalRendering", []);
            setChildEntryValues([]);
        }
    }, [focusedElement]);

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
            setValue("conditionalRendering", updatedValues);
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
            setValue("conditionalRendering", updatedValues);
            return updatedValues;
        });
    };

    const handleDelete = (index: number) => {
        setChildEntryValues((prevValues) => {
            const updatedValues = prevValues.filter((_, i) => i !== index);
            setValue("conditionalRendering", updatedValues);
            return updatedValues;
        });
    };

    // =========================================================================
    // USE EFFECTS
    // =========================================================================
    useEffect(() => {
        setChildEntryValues(
            element?.conditionalRendering !== undefined
                ? element?.conditionalRendering
                : []
        );
    }, [element]);

    useEffect(() => {
        setValue("conditionalRendering", childEntryValues, {
            shouldDirty: true,
        });
    }, [childEntryValues]);

    useEffect(() => {
        if (isDirty) {
            updateFocusedElement(true);
        }
    }, [isDirty, updateFocusedElement]);

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
                index={index}
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
