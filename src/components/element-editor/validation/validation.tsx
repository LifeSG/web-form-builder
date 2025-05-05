import { Typography } from "@lifesg/react-design-system/typography";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MultiEntry } from "src/components/common";
import { EElementType, useBuilder } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import {
    TOverallTextBasedYupSchema,
    TSchemasWithValidation,
    YupSchemaBuilder,
} from "src/yup-schemas";
import * as Yup from "yup";
import {
    EmailValidationChild,
    LongTextValidationChild,
    NumericValidationChild,
    TextValidationChild,
} from "./elements";
import { ContactValidationChild } from "./elements/contact/contact-validation-child";
import { getValidationOptionsByType } from "./helper";

export const Validation = () => {
    // =========================================================================
    // CONST, STATES, REFS
    // =========================================================================
    const { selectedElementType, focusedElement } = useBuilder();
    const { watch, control } = useFormContext<TSchemasWithValidation>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "validation",
        shouldUnregister: true,
    });
    const schema = YupSchemaBuilder.buildYupSchema(
        selectedElementType
    ) as TOverallTextBasedYupSchema;
    const validationValues = watch("validation", []);
    const elementType = watch("type", focusedElement?.element?.type);
    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const hasReachedMaxEntries = () => {
        switch (elementType) {
            case EElementType.EMAIL:
            case EElementType.TEXT:
            case EElementType.NUMERIC:
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
                <Typography.BodyBL>
                    To add new validation, fill up existing validation first.
                </Typography.BodyBL>
            );
        } else if (hasReachedMaxEntries()) {
            return (
                <Typography.BodyBL>
                    Limit reached. To add new validation, remove existing ones
                    first.
                </Typography.BodyBL>
            );
        }
    };

    const setDefaultValidationType = () => {
        switch (elementType) {
            case EElementType.EMAIL:
            case EElementType.TEXTAREA:
                return ELEMENT_VALIDATION_TYPES["Text field"][elementType]
                    .validationTypes[0];
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
        const options = getValidationOptionsByType(
            validationValues,
            elementType
        );

        return fields.map((field, index) => {
            switch (elementType) {
                case EElementType.EMAIL:
                    return (
                        <EmailValidationChild
                            key={field.id}
                            index={index}
                            options={options}
                            disabled={options.length === 1}
                            onDelete={() => handleDelete(index)}
                        />
                    );
                case EElementType.TEXTAREA:
                    return (
                        <LongTextValidationChild
                            key={field.id}
                            index={index}
                            options={options}
                            disabled={options.length === 1}
                            onDelete={() => handleDelete(index)}
                        />
                    );
                case EElementType.NUMERIC:
                    return (
                        <NumericValidationChild
                            key={field.id}
                            index={index}
                            options={options}
                            onDelete={() => handleDelete(index)}
                        />
                    );
                case EElementType.TEXT:
                    return (
                        <TextValidationChild
                            key={field.id}
                            index={index}
                            options={options}
                            onDelete={() => handleDelete(index)}
                        />
                    );
                case EElementType.CONTACT:
                    return (
                        <ContactValidationChild
                            key={field.id}
                            index={index}
                            options={options}
                            disabled={options.length === 1}
                        />
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <MultiEntry
            onAdd={handleAddButtonClick}
            title="Additional Validation"
            buttonLabel="validation"
            disabledButton={
                hasReachedMaxEntries() || hasInvalidAndEmptyFields()
            }
            popoverMessage={getPopoverMessage()}
            expanded={selectedElementType === EElementType.CONTACT}
            hideAddButton={selectedElementType === EElementType.CONTACT}
        >
            {renderChildren()}
        </MultiEntry>
    );
};
