import { V2_Text } from "@lifesg/react-design-system/v2_text";
import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import {
    EConditionType,
    EElementType,
    useBuilder,
} from "src/context-providers";
import { TFormFieldValues, YupSchemaBuilder } from "src/yup-schemas";
import * as Yup from "yup";
import { ConditionalRenderingChild } from "./conditional-rendering-child";

interface IOptions {
    label: string;
    elementType: EElementType;
    id?: string;
    internalId?: string;
}

export const ConditionalRendering = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { watch, control } = useFormContext<TFormFieldValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "conditionalRendering",
        shouldUnregister: true,
    });
    const { focusedElement, elements, selectedElementType } = useBuilder();
    const element = focusedElement?.element;
    const schema = YupSchemaBuilder.buildYupSchema(selectedElementType);
    const conditionalRenderingValues = watch("conditionalRendering");
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
                    elementType: value?.type,
                };
                options.push(optionItem);
            }
        });
        return options;
    };

    const hasInvalidAndEmptyFields = () => {
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
    };

    const getPopoverMessage = useCallback(() => {
        if (hasInvalidAndEmptyFields()) {
            return (
                (<V2_Text.Body>To add a new condition, fill up the existing condition
                                        first.</V2_Text.Body>)
            );
        }
        if (getElementOptions()?.length === 0) {
            return <V2_Text.Body>No conditional rendering available.</V2_Text.Body>;
        }
        return null;
    }, [hasInvalidAndEmptyFields, getElementOptions]);
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
            disabledButton={
                getElementOptions().length === 0 || hasInvalidAndEmptyFields()
            }
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
