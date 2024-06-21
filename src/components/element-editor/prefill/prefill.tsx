import { Text } from "@lifesg/react-design-system/text";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import { EElementType, IPrefillAttributes } from "src/context-providers";
import { IBaseTextBasedFieldValues, SchemaHelper } from "src/schemas";
import * as Yup from "yup";
import { PrefillChild } from "./prefill-child";
export const Prefill = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const [, setChildEntryValues] = useState<IPrefillAttributes[]>([]);
    const { setValue, watch, getValues } =
        useFormContext<IBaseTextBasedFieldValues>();
    const prefillValues = getValues("prefill") || [];
    const schema = SchemaHelper.buildSchema(EElementType.EMAIL);
    const invalidAndEmptyFields = checkIsValid();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    function checkIsValid() {
        try {
            const validationSchema = schema.pick(["prefill"]);

            validationSchema.validateSync({
                prefill: prefillValues,
                abortEarly: false,
            });
            return false;
        } catch (error) {
            return Yup.ValidationError.isError(error);
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
        const updatedValues = [...prefillValues, prefillChild];
        setValue("prefill", updatedValues, { shouldDirty: true });
    };

    const handleDelete = (index: number) => {
        const currentValues = [...prefillValues];
        const updatedValues = currentValues.filter((_, i) => i !== index);

        /** * shouldDirty will only dirty the field; the dirty state is not propagated to the form level
         * * workaround is to wait for RHF to register the change and set the value again
         * * reference: https://github.com/orgs/react-hook-form/discussions/9913#discussioncomment-4936301 */

        setValue("prefill", updatedValues, { shouldDirty: true });
        setTimeout(() => {
            setValue("prefill", updatedValues, { shouldDirty: true });
        });
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        const subscription = watch((values) => {
            if (values?.prefill) {
                setChildEntryValues([
                    ...values?.prefill,
                ] as IPrefillAttributes[]);
            } else {
                setChildEntryValues([]);
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = () => {
        if (prefillValues?.length === 0) {
            return;
        } else {
            return prefillValues?.map((_, index) => (
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
