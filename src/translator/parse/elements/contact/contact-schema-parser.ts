import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import {
    IContactFieldSchema,
    IContactFieldValidationRule,
} from "@lifesg/web-frontend-engine/components/fields";
import { EValidationType, TElement } from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { parseBaseSchema } from "../../common";

export namespace ContactSchemaParser {
    interface IContactFieldValidationRuleWithError
        extends IContactFieldValidationRule {
        errorMessage: string;
    }
    const parseContactValidation = (
        validation: (IYupValidationRule | IContactFieldValidationRule)[]
    ) => {
        if (!validation) {
            throw new Error("Contact schema must have additional validation.");
        }

        const contactNumberValidations = validation.filter((item) =>
            Object.prototype.hasOwnProperty.call(item, "contactNumber")
        ) as IContactFieldValidationRuleWithError[];

        if (
            contactNumberValidations.length === 0 ||
            contactNumberValidations.length > 1
        ) {
            throw new Error(
                "Contact schema must define exactly one contactNumber validation."
            );
        }

        const contactNumberObject = contactNumberValidations[0];
        if (
            !contactNumberObject ||
            !(
                "singaporeNumber" in contactNumberObject.contactNumber ||
                "internationalNumber" in contactNumberObject.contactNumber
            )
        ) {
            throw new Error(
                "Contact schema must have contactNumber validation with either singaporeNumber or internationalNumber."
            );
        }

        const { contactNumber, errorMessage } = contactNumberObject;

        if ("singaporeNumber" in contactNumber) {
            return {
                defaultCountryCode: "Singapore",
                displayAsFixedCountryCode: true,
                validation: [
                    {
                        validationType: EValidationType.CONTACT_NUMBER,
                        validationRule: contactNumber.singaporeNumber,
                        validationErrorMessage: errorMessage,
                    },
                ],
            };
        }

        if (contactNumber.internationalNumber === false) {
            throw new Error(
                "Contact schema must set internationalNumber to true if it is defined."
            );
        }

        if (contactNumber.internationalNumber === true) {
            return {
                displayAsFixedCountryCode: false,
                validation: [
                    {
                        validationType: EValidationType.CONTACT_NUMBER,
                        validationErrorMessage: errorMessage,
                    },
                ],
            };
        }

        return {
            defaultCountryCode: contactNumber.internationalNumber,
            displayAsFixedCountryCode: true,
            validation: [
                {
                    validationType: EValidationType.CONTACT_NUMBER,
                    validationErrorMessage: errorMessage,
                },
            ],
        };
    };

    export const schemaToElement = (
        schema: IContactFieldSchema,
        id: string,
        prefill: IPrefillConfig,
        defaultValue?: string
    ) => {
        const baseElement = parseBaseSchema(schema, id, prefill, defaultValue);
        const { placeholder, allowClear, defaultCountry, validation } = schema;

        const additionalValidation = parseContactValidation(validation);

        const parsedElement: TElement = {
            ...baseElement,
            placeholder: placeholder || "",
            enableClearButton: allowClear || false,
            defaultCountryCode: defaultCountry || "",
            ...additionalValidation,
        };

        return parsedElement;
    };
}
