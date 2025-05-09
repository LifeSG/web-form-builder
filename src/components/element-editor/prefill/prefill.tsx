import { Typography } from "@lifesg/react-design-system/typography";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import { useBuilder } from "src/context-providers";
import { TFormFieldValues, YupSchemaBuilder } from "src/yup-schemas";
import * as Yup from "yup";
import { PrefillChild } from "./prefill-child";
export const Prefill = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { selectedElementType } = useBuilder();
    const { watch, control } = useFormContext<TFormFieldValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "prefill",
        shouldUnregister: true,
    });
    const prefillValues = watch("prefill");
    const schema = YupSchemaBuilder.buildYupSchema(selectedElementType);

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const hasInvalidAndEmptyFields = () => {
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
    };

    const getPopoverMessage = () => {
        if (hasInvalidAndEmptyFields()) {
            return (
                <Typography.BodyBL>
                    To add new prefill, fill up existing prefill first.
                </Typography.BodyBL>
            );
        }
    };

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
            disabledButton={hasInvalidAndEmptyFields()}
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
