import { Text } from "@lifesg/react-design-system/text";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import {
    EConditionType,
    IConditionalRendering,
    useBuilder,
} from "src/context-providers";
import { TBaseTextBasedFieldValues, SchemaHelper } from "src/schemas";
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

    const { focusedElement, elements } = useBuilder();
    const element = focusedElement?.element;
    const [, setChildEntryValues] = useState<IConditionalRendering[]>([]);
    const { setValue, watch, getValues } =
        useFormContext<TBaseTextBasedFieldValues>();

    const schema = SchemaHelper.buildSchema(element.type);
    const invalidAndEmptyFields = checkIsValid();
    const conditionalRenderingValues = getValues("conditionalRendering") || [];
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
        const updatedValues = [
            ...conditionalRenderingValues,
            conditionalRenderingChild,
        ];
        setValue("conditionalRendering", updatedValues, { shouldDirty: true });
    };

    const handleDelete = (index: number) => {
        const currentValues = [...conditionalRenderingValues];
        const updatedValues = currentValues?.filter((_, i) => i !== index);

        /** * shouldDirty will only dirty the field; the dirty state is not propagated to the form level
         * * workaround is to wait for RHF to register the change and set the value again
         * * reference: https://github.com/orgs/react-hook-form/discussions/9913#discussioncomment-4936301 */

        setValue("conditionalRendering", updatedValues, { shouldDirty: true });
        setTimeout(() => {
            setValue("conditionalRendering", updatedValues, {
                shouldDirty: true,
            });
        });
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        const subscription = watch((values) => {
            if (values?.conditionalRendering) {
                setChildEntryValues([
                    ...values?.conditionalRendering,
                ] as IConditionalRendering[]);
            } else {
                setChildEntryValues([]);
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderChildren = () => {
        return conditionalRenderingValues?.map((_, index) => (
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
