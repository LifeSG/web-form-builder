import { Text } from "@lifesg/react-design-system/text";
import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import {
    EConditionType,
    EElementType,
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
    const { watch, control } = useFormContext<IBaseTextBasedFieldValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "conditionalRendering",
        shouldUnregister: true,
    });
    const { focusedElement, elements } = useBuilder();
    const element = focusedElement?.element;
    const schema = SchemaHelper.buildSchema(EElementType.EMAIL);
    const conditionalRenderingValues = watch("conditionalRendering");
    const invalidAndEmptyFields = checkIsValid();

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

    function checkIsValid() {
        try {
            const validationSchema = schema.pick(["conditionalRendering"]);
            validationSchema.validateSync({
                conditionalRendering: conditionalRenderingValues,
                abortEarly: false,
            });
            return false;
        } catch (error) {
            return Yup.ValidationError.isError(error);
        }
    }

    const getPopoverMessage = useCallback(() => {
        const invalidAndEmptyFields = checkIsValid();
        if (invalidAndEmptyFields) {
            return (
                <Text.Body>
                    To add a new condition, fill up the existing condition
                    first.
                </Text.Body>
            );
        } else if (getElementOptions()?.length === 0) {
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
            comparator: EConditionType.EQUALS,
            value: "",
            internalId: "",
        };
        append(conditionalRenderingChild);
    };

    const handleDelete = (index: number) => {
        remove(index);
    };

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderChildren = () => {
        return fields.map((field, index) => (
            <ConditionalRenderingChild
                key={field.id}
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
            disabledButton={getElementOptions().length === 0 || checkIsValid()}
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
