import { Text } from "@lifesg/react-design-system/text";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import { EElementType, useBuilder } from "src/context-providers";
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
    const { watch, control } = useFormContext<IBaseTextBasedFieldValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "validation",
        shouldUnregister: true,
    });
    const schema = SchemaHelper.buildSchema(EElementType.EMAIL);
    const validationValues = watch(
        "validation",
        focusedElement.element.validation
    );
    const elementType = watch("type", focusedElement.element.type);
    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const hasReachedMaxEntries = (elementType: EElementType) => {
        switch (elementType) {
            case EElementType.EMAIL:
            case EElementType.TEXT:
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
        } else if (hasReachedMaxEntries(elementType)) {
            return (
                <Text.Body>
                    Limit reached. To add new validation, remove existing ones
                    first.
                </Text.Body>
            );
        }
    };

    const setDefaultValidationType = () => {
        switch (elementType) {
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
        append(validationChild);
    };

    const handleDelete = (index: number) => {
        remove(index);
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderChildren = () => {
        return fields.map((field, index) => (
            <ValidationChild
                key={field.id}
                onDelete={() => handleDelete(index)}
                options={getValidationOptionsByType(
                    validationValues,
                    elementType
                )}
                index={index}
            />
        ));
    };

    return (
        <MultiEntry
            onAdd={handleAddButtonClick}
            title="Validation"
            buttonLabel="validation"
            disabledButton={hasReachedMaxEntries(elementType) || checkIsValid()}
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
