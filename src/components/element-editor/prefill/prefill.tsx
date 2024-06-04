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
    const { updateFocusedElement } = useBuilder();
    const [childEntryValues, setChildEntryValues] = useState<
        IPrefillAttributes[]
    >([]);
    const {
        setValue,
        formState: { isDirty },
        watch,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const schema = SchemaHelper.buildSchema(EElementType.EMAIL);
    const invalidAndEmptyFields = getTouchedAndErrorsFields();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    function getTouchedAndErrorsFields() {
        if (childEntryValues && childEntryValues.length > 0) {
            try {
                const validationSchema = schema.pick(["prefill"]);
                validationSchema.validateSync({
                    prefill: childEntryValues,
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

    const handleAddButtonClick = () => {
        const prefillChild = {
            prefillMode: null,
            path: "",
        };
        const updatedValues = [...childEntryValues, prefillChild];
        setValue("prefill", updatedValues);
    };

    const handleDelete = (index: number) => {
        const currentValues = [...childEntryValues];
        const updatedValues = currentValues.filter((_, i) => i !== index);
        setValue("prefill", updatedValues);
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================

    useEffect(() => {
        const subscription = watch((values, { name }) => {
            if (name?.startsWith("prefill")) {
                setChildEntryValues(
                    ([...values?.prefill] as IPrefillAttributes[]) || []
                );
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (isDirty) {
            updateFocusedElement(true);
        }
    }, [isDirty, updateFocusedElement]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = () => {
        if (childEntryValues?.length === 0) {
            return;
        } else {
            return childEntryValues?.map((_, index) => (
                <PrefillChild
                    key={`prefill-entry-${index}`}
                    onDelete={() => handleDelete(index)}
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
