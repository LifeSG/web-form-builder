import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import {
    EPopoverReason,
    IConditionalRendering,
    useBuilder,
} from "src/context-providers";
import { IBaseTextBasedFieldValues } from "src/schemas";
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

    const { focusedElement, elements, updateFocusedElement } = useBuilder();
    const element = focusedElement.element;
    const [childEntryValues, setChildEntryValues] =
        useState<IConditionalRendering[]>();
    const {
        setValue,
        formState: { isDirty, errors, touchedFields },
        getValues,
    } = useFormContext<IBaseTextBasedFieldValues>();
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

    function getTouchedAndErrorsFields() {
        let count = 0;
        let hasEmptyField = false;
        const conditionalRenderingFields = getValues("conditionalRendering");

        if (touchedFields?.conditionalRendering?.length > 0) {
            touchedFields.conditionalRendering.forEach((field) => {
                count += Object.keys(field).length;
            });

            conditionalRenderingFields?.forEach((field) => {
                if (Object.values(field).includes("")) {
                    hasEmptyField = true;
                }
            });

            const hasErrors = errors?.conditionalRendering?.length > 0;
            const incompleteFields =
                count !== childEntryValues.length * 3 &&
                hasEmptyField &&
                childEntryValues?.length > 0;

            return hasErrors || incompleteFields;
        } else {
            const hasErrors = errors?.conditionalRendering?.length !== 0;
            const noTouchedFields =
                touchedFields?.conditionalRendering?.length === undefined;
            const hasChildEntries = childEntryValues?.length > 0;

            return hasErrors && noTouchedFields && hasChildEntries;
        }
    }

    function getPopoverReason() {
        if (getTouchedAndErrorsFields()) {
            return EPopoverReason.EMPTY_OR_INVALID;
        } else if (getElementOptions().length === 0) {
            return EPopoverReason.NO_CONDITION;
        }
    }

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
            disabledButton={
                getElementOptions().length === 0 || getTouchedAndErrorsFields()
            }
            popoverReason={getPopoverReason()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
