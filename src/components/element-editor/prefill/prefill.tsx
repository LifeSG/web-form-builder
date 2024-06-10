import { Text } from "@lifesg/react-design-system/text";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import {
    EElementType,
    IPrefillAttributes,
    useBuilder,
} from "src/context-providers";
import { IBaseTextBasedFieldValues, SchemaHelper } from "src/schemas";
import * as Yup from "yup";
import { PrefillChild } from "./prefill-child";

export const Prefill = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { focusedElement, updateFocusedElement } = useBuilder();
    const element = focusedElement?.element;
    const [childEntryValues, setChildEntryValues] = useState<
        IPrefillAttributes[]
    >([]);
    const {
        setValue,
        formState: { isDirty },
        getValues,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const shouldUpdateFocusedElement =
        isDirty ||
        childEntryValues?.length > focusedElement?.element?.prefill?.length;
    const schema = SchemaHelper.buildSchema(EElementType.EMAIL);
    const invalidAndEmptyFields = getTouchedAndErrorsFields();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    function getTouchedAndErrorsFields() {
        if (childEntryValues && childEntryValues.length > 0) {
            try {
                const validationSchema = schema.pick(["prefill"]);
                const prefillValues = getValues("prefill");
                validationSchema.validateSync({
                    prefill: prefillValues,
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

    function getPopoverMessage() {
        if (invalidAndEmptyFields) {
            return (
                <Text.Body>
                    To add new prefill, fill up existing prefill first.
                </Text.Body>
            );
        }
    }

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleChildChange = (index: number, newValue: IPrefillAttributes) => {
        const updatedValues = [...childEntryValues];
        updatedValues[index] = newValue;
        setChildEntryValues(updatedValues);
        setValue("prefill", updatedValues);
    };

    const handleAddButtonClick = () => {
        const prefillChild = {
            prefillMode: null,
            path: "",
        };
        const updatedValues = [...childEntryValues, prefillChild];
        setChildEntryValues(updatedValues);
        setValue("prefill", updatedValues);
    };

    const handleDelete = (index: number) => {
        const currentValues = [...childEntryValues];
        const updatedValues = currentValues.filter((_, i) => i !== index);
        setChildEntryValues(updatedValues);
        setValue("prefill", updatedValues);
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================

    useEffect(() => {
        setChildEntryValues(element?.prefill);
    }, [focusedElement.element]);

    useEffect(() => {
        setValue("prefill", childEntryValues, {
            shouldDirty: true,
        });
    }, [childEntryValues]);

    useEffect(() => {
        if (shouldUpdateFocusedElement) {
            updateFocusedElement(true);
        }
    }, [shouldUpdateFocusedElement]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = () => {
        if (childEntryValues?.length === 0) {
            return;
        } else {
            return childEntryValues?.map((child, index) => (
                <PrefillChild
                    key={`prefill-entry-${index}`}
                    onDelete={() => handleDelete(index)}
                    onChange={(newValue) => handleChildChange(index, newValue)}
                    value={child}
                    index={index}
                />
            ));
        }
    };

    return (
        <MultiEntry
            onAdd={handleAddButtonClick}
            title="Prefill"
            buttonLabel="prefill"
            subtitle="Prefill information from various data sources, for example Myinfo."
            disabledButton={invalidAndEmptyFields}
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
