import { useEffect, useState } from "react";
import { MultiEntry } from "src/components/common";
import { IConditionalRendering, useBuilder } from "src/context-providers";
import {
    ConditionalRenderingChild,
    IOnChangeProps,
} from "./conditional-rendering-child";
import { useFormContext } from "react-hook-form";
import { IBaseTextBasedFieldValues } from "src/schemas";

interface IOptions {
    label: string;
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
        formState: { isDirty, touchedFields },
    } = useFormContext<IBaseTextBasedFieldValues>();
    const shouldUpdateFocusedElement =
        (isDirty && Object.keys(touchedFields)?.length > 0) ||
        childEntryValues?.length >
            focusedElement?.element?.conditionalRendering?.length;

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
                    internalId: value?.internalId,
                };
                options.push(optionItem);
            }
        });
        return options;
    };

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
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        const updatedChildEntries = element.conditionalRendering?.filter(
            (child) => {
                return elements?.hasOwnProperty(child.internalId);
            }
        );
        setValue("conditionalRendering", updatedChildEntries);
        setChildEntryValues(updatedChildEntries);
    }, [element]);

    useEffect(() => {
        setValue("conditionalRendering", childEntryValues, {
            shouldDirty: true,
        });
    }, [childEntryValues]);

    useEffect(() => {
        if (shouldUpdateFocusedElement) {
            updateFocusedElement(true);
        }
    }, [shouldUpdateFocusedElement]);

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
                index={index}
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
