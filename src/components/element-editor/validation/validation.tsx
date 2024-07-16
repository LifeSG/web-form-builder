import { Text } from "@lifesg/react-design-system";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import { EElementType, IValidation, useBuilder } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import { IBaseTextBasedFieldValues, SchemaHelper } from "src/schemas";
import * as Yup from "yup";
import { getValidationOptionsByType } from "./helper";
import { ValidationChild } from "./validation-child";

export const Validation = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { focusedElement } = useBuilder();
    const element = focusedElement?.element;
    const [, setChildEntryValues] = useState<IValidation[]>([]);
    const { setValue, watch, getValues } =
        useFormContext<IBaseTextBasedFieldValues>();
    const validationValues = getValues("validation") || [];
    const schema = SchemaHelper.buildSchema(element.type);

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const getMaxEntries = (elementType: EElementType) => {
        switch (elementType) {
            case EElementType.EMAIL:
            case EElementType.TEXT:
            case EElementType.TEXTAREA:
                return (
                    validationValues?.length ===
                    ELEMENT_VALIDATION_TYPES["Text field"][elementType]
                        .maxEntries
                );

            default:
                return validationValues?.length === 6; // this is a arbitary value will be changed later on
        }
    };

    const checkIsValid = () => {
        try {
            const validationSchema = schema.pick(["validation"]);

            validationSchema.validateSync({
                validation: validationValues,
                abortEarly: false,
            });
            return false;
        } catch (error) {
            return Yup.ValidationError.isError(error);
        }
    };

    const getPopoverMessage = () => {
        const invalidAndEmptyFields = checkIsValid();
        if (invalidAndEmptyFields) {
            return (
                <Text.Body>
                    To add new validation, fill up existing validation first.
                </Text.Body>
            );
        } else if (getMaxEntries(element?.type)) {
            return (
                <Text.Body>
                    Limit reached. To add new validation, remove existing ones
                    first.
                </Text.Body>
            );
        }
    };

    const setDefaultValidationType = () => {
        switch (element?.type) {
            case EElementType.EMAIL:
            case EElementType.TEXTAREA:
                return ELEMENT_VALIDATION_TYPES["Text field"][element?.type]
                    .validationTypes[0];
            default:
                return "";
        }
    };

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const handleAddButtonClick = () => {
        const validationChild = {
            validationType: setDefaultValidationType(),
            validationRule: "",
            validationErrorMessage: "",
        };

        const updatedValues = [...validationValues, validationChild];
        setValue("validation", updatedValues, { shouldDirty: true });
    };

    const handleDelete = (index: number) => {
        const currentValues = [...validationValues];
        const updatedValues = currentValues.filter((_, i) => i !== index);

        /** * shouldDirty will only dirty the field; the dirty state is not propagated to the form level
         * * workaround is to wait for RHF to register the change and set the value again
         * * reference: https://github.com/orgs/react-hook-form/discussions/9913#discussioncomment-4936301 */

        setValue("validation", updatedValues, { shouldDirty: true });
        setTimeout(() => {
            setValue("validation", updatedValues, { shouldDirty: true });
        });
    };

    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        const subscription = watch((values) => {
            if (values?.validation) {
                setChildEntryValues([...values?.validation] as IValidation[]);
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
        return validationValues?.map((_, index) => (
            <ValidationChild
                key={`validation-entry-${index}`}
                onDelete={() => handleDelete(index)}
                options={getValidationOptionsByType(
                    validationValues,
                    element.type
                )}
                index={index}
            />
        ));
    };

    return (
        <MultiEntry
            onAdd={handleAddButtonClick}
            title="Additional Validation"
            buttonLabel="validation"
            disabledButton={getMaxEntries(element?.type) || checkIsValid()}
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
