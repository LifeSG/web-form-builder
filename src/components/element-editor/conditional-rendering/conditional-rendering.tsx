import { Text } from "@lifesg/react-design-system/text";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import {
    EElementType,
    IConditionalRendering,
    useBuilder,
} from "src/context-providers";
import { IBaseTextBasedFieldValues, SchemaHelper } from "src/schemas";
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
        formState: { isDirty },
        getValues,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const schema = SchemaHelper.buildSchema(EElementType.EMAIL);
    const invalidAndEmptyFields = getTouchedAndErrorsFields();
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
        if (childEntryValues && childEntryValues.length > 0) {
            try {
                const validationSchema = schema.pick(["conditionalRendering"]);
                const conditionalRenderingValues = getValues(
                    "conditionalRendering"
                );
                const validationResult = validationSchema.validateSync({
                    conditionalRendering: conditionalRenderingValues,
                    abortEarly: false,
                });
                return !!validationResult ? false : true;
            } catch (error) {
                if (
                    error.errors.some((errorMessage: string | string[]) =>
                        errorMessage.includes("required")
                    )
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    function getPopoverMessage() {
        if (invalidAndEmptyFields) {
            return (
                <Text.Body>
                    To add new condition, fill up existing condition first.
                </Text.Body>
            );
        } else if (getElementOptions().length === 0) {
            return <Text.Body>No conditional rendering available.</Text.Body>;
        }
    }

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================

    const handleChildChange = (
        index: number,
        newValue: IConditionalRendering
    ) => {
        const updatedValues = [...childEntryValues];
        updatedValues[index] = newValue;
        setChildEntryValues(updatedValues);
        setValue("conditionalRendering", updatedValues);
    };

    const handleAddButtonClick = () => {
        const conditionalRenderingChild = {
            fieldKey: "",
            comparator: "",
            value: "",
            internalId: "",
        };
        const updatedValues = [...childEntryValues, conditionalRenderingChild];
        setChildEntryValues(updatedValues);
        setValue("conditionalRendering", updatedValues);
    };

    const handleDelete = (index: number) => {
        const currentValues = [...childEntryValues];
        const updatedValues = currentValues.filter((_, i) => i !== index);
        setChildEntryValues(updatedValues);
        setValue("conditionalRendering", updatedValues);
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
                getElementOptions().length === 0 || invalidAndEmptyFields
            }
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
