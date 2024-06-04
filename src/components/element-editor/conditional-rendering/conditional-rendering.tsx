import { Text } from "@lifesg/react-design-system/text";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import {
    EElementType,
    IConditionalRendering,
    useBuilder,
} from "src/context-providers";
import { IBaseTextBasedFieldValues, SchemaHelper } from "src/schemas";
import * as Yup from "yup";
import { ConditionalRenderingChild } from "./conditional-rendering-child";

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
    const [childEntryValues, setChildEntryValues] = useState<
        IConditionalRendering[]
    >([]);
    const {
        setValue,
        formState: { isDirty },
        watch,
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
                validationSchema.validateSync({
                    conditionalRendering: childEntryValues,
                    abortEarly: false,
                });
                return false;
            } catch (error) {
                return Yup.ValidationError.isError(error);
            }
        } else {
            return false;
        }
    }

    const getPopoverMessage = useCallback(() => {
        if (invalidAndEmptyFields) {
            return (
                <Text.Body>
                    To add a new condition, fill up the existing condition
                    first.
                </Text.Body>
            );
        } else if (getElementOptions().length === 0) {
            return <Text.Body>No conditional rendering available.</Text.Body>;
        }
        return null;
    }, [invalidAndEmptyFields, getElementOptions]);

    // =============================================================================
    // EVENT HANDLERS
    // ============================================================================

    const handleAddButtonClick = () => {
        const conditionalRenderingChild = {
            fieldKey: "",
            comparator: "Equals",
            value: "",
            internalId: "",
        };
        const updatedValues = [...childEntryValues, conditionalRenderingChild];
        setValue("conditionalRendering", updatedValues);
    };

    const handleDelete = (index: number) => {
        const currentValues = [...childEntryValues];
        const updatedValues = currentValues.filter((_, i) => i !== index);
        setValue("conditionalRendering", updatedValues);
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        const subscription = watch((values, { name }) => {
            if (name?.startsWith("conditionalRendering")) {
                setChildEntryValues(
                    ([
                        ...values?.conditionalRendering,
                    ] as IConditionalRendering[]) || []
                );
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const updatedChildEntries = element.conditionalRendering?.filter(
            (child) => {
                return elements?.hasOwnProperty(child.internalId);
            }
        );
        setValue("conditionalRendering", updatedChildEntries);
    }, [element]);

    useEffect(() => {
        if (isDirty) {
            updateFocusedElement(true);
        }
    }, [isDirty, updateFocusedElement]);

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderChildren = () => {
        return childEntryValues?.map((_, index) => (
            <ConditionalRenderingChild
                key={`conditional-rendering-entry-${index}`}
                onDelete={() => handleDelete(index)}
                options={getElementOptions()}
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
