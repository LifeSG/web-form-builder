import { Text } from "@lifesg/react-design-system/text";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import {
    EElementType,
    TTextBasedElement,
    useBuilder,
} from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import {
    SchemaHelper,
    TOverallTextBasedSchema,
    TOverallTextBasedYupSchema,
} from "src/schemas";
import * as Yup from "yup";
import { getValidationOptionsByType } from "./helper";
import { ValidationChild } from "./validation-child";

export const Validation = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { focusedElement, selectedElementType } = useBuilder();
    const { watch, control } = useFormContext<TOverallTextBasedSchema>(); //Validation is only present in text-based-fields.
    const { fields, append, remove } = useFieldArray({
        control,
        name: "validation",
        shouldUnregister: true,
    });
    const schema = SchemaHelper.buildSchema(
        selectedElementType
    ) as TOverallTextBasedYupSchema;
    const validationValues = watch(
        "validation",
        (focusedElement.element as TTextBasedElement).validation
    );
    const elementType = watch(
        "type",
        focusedElement.element.type
    ) as EElementType;
    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const hasReachedMaxEntries = (elementType: EElementType) => {
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

    const hasInvalidAndEmptyFields = () => {
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
        if (hasInvalidAndEmptyFields()) {
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
            case EElementType.TEXTAREA:
                return ELEMENT_VALIDATION_TYPES["Text field"][
                    focusedElement?.element?.type
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
            title="Additional Validation"
            buttonLabel="validation"
            disabledButton={
                hasReachedMaxEntries(elementType) || hasInvalidAndEmptyFields()
            }
            popoverMessage={getPopoverMessage()}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
