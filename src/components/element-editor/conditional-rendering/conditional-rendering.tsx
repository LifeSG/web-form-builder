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
import { Text } from "@lifesg/react-design-system/text";

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
    const invalidAndEmptyFields = getTouchedAndErrorsFields();
    const schema = SchemaHelper.buildSchema(EElementType.EMAIL);
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
        console.log(childEntryValues, childEntryValues?.length > 0);
        if (childEntryValues && childEntryValues?.length > 0) {
            try {
                const validationSchema = schema.pick(["conditionalRendering"]);
                const validationResult =
                    validationSchema.validate(childEntryValues);
                return !!validationResult; // Cast the result to boolean
            } catch (error) {
                console.error("Error during schema validation:", error);
                return false;
            }
        } else {
            return false; // Return false when there are no childEntryValues
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
                getElementOptions().length === 0 || invalidAndEmptyFields
            }
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
