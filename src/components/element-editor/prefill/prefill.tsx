import { Text } from "@lifesg/react-design-system/text";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import { EElementType } from "src/context-providers";
import { IBaseTextBasedFieldValues, SchemaHelper } from "src/schemas";
import * as Yup from "yup";
import { PrefillChild } from "./prefill-child";
export const Prefill = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { watch, control } = useFormContext<IBaseTextBasedFieldValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "prefill",
        shouldUnregister: true,
    });
    const prefillValues = watch("prefill");
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
        append(prefillChild);
    };

    const handleDelete = (index: number) => {
        remove(index);
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = () => {
        if (prefillValues?.length === 0) {
            return;
        } else {
            return fields.map((field, index) => (
                <PrefillChild
                    key={field.id}
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
