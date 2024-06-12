import { Text } from "@lifesg/react-design-system";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import { EElementType, IValidation, useBuilder } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import { IBaseTextBasedFieldValues, SchemaHelper } from "src/schemas";
import * as Yup from "yup";
import { ValidationChild } from "./validation-child";

export const Validation = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { focusedElement, updateFocusedElement } = useBuilder();
    const element = focusedElement?.element;
    const [, setChildEntryValues] = useState<IValidation[]>([]);
    const {
        setValue,
        formState: { isDirty },
        watch,
        getValues,
    } = useFormContext<IBaseTextBasedFieldValues>();
    const validationValues = getValues("validation") || [];
    const shouldUpdateFocusedElement =
        isDirty ||
        getValues("validation")?.length >
            focusedElement?.element?.validation?.length;
    const schema = SchemaHelper.buildSchema(EElementType.EMAIL);
    const invalidAndEmptyFields = getTouchedAndErrorsFields();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    function getOptionsByType(elementType: EElementType) {
        switch (elementType) {
            case EElementType.EMAIL:
                return ELEMENT_VALIDATION_TYPES["Text field"][
                    EElementType.EMAIL
                ].validationTypes;
            default:
                return ["Select", "Type 1"];
        }
    }

    function getMaxEntries(elementType: EElementType) {
        switch (elementType) {
            case EElementType.EMAIL:
                return ELEMENT_VALIDATION_TYPES["Text field"][
                    EElementType.EMAIL
                ].maxEntries;
            default:
                return 6; // this is a arbitary value will be changed later on
        }
    }

    function getTouchedAndErrorsFields() {
        if (validationValues && validationValues.length > 0) {
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
        } else {
            return false;
        }
    }

    function getPopoverMessage() {
        if (invalidAndEmptyFields) {
            return (
                <Text.Body>
                    To add new validation, fill up existing validation first.
                </Text.Body>
            );
        } else if (validationValues?.length === getMaxEntries(element?.type)) {
            return (
                <Text.Body>
                    Limit reached. To add new validation, remove existing ones
                    first.
                </Text.Body>
            );
        }
    }

    const setDefaultValidationType = () => {
        switch (element?.type) {
            case EElementType.EMAIL:
                return ELEMENT_VALIDATION_TYPES["Text field"][
                    EElementType.EMAIL
                ].validationTypes[0];
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
        setValue("validation", updatedValues);
    };

    const handleDelete = (index: number) => {
        const currentValues = [...validationValues];
        const updatedValues = currentValues.filter((_, i) => i !== index);
        setValue("validation", updatedValues);
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

    useEffect(() => {
        if (shouldUpdateFocusedElement) {
            updateFocusedElement(true);
        } else {
            updateFocusedElement(false);
        }
    }, [shouldUpdateFocusedElement]);
    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = () => {
        return validationValues?.map((_, index) => (
            <ValidationChild
                key={`validation-entry-${index}`}
                onDelete={() => handleDelete(index)}
                options={getOptionsByType(element.type)}
                index={index}
            />
        ));
    };

    return (
        <MultiEntry
            onAdd={handleAddButtonClick}
            title="Validation"
            buttonLabel="validation"
            disabledButton={
                validationValues?.length === getMaxEntries(element?.type) ||
                invalidAndEmptyFields
            }
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
