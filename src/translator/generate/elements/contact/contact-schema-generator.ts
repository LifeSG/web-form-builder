import { IContactFieldAttributes } from "src/context-providers";
import { generateBaseSchema } from "../../common";

export namespace ContactSchemaGenerator {
    interface ContactNumberSchema {
        singaporeNumber?: string;
        internationalNumber?: string | boolean;
    }

    const generateContactAdditionalValidationSchema = (
        element: IContactFieldAttributes
    ) => {
        const { defaultCountryCode, displayAsFixedCountryCode, validation } =
            element;

        const { validationRule, validationErrorMessage } = validation[0];

        const schema: {
            contactNumber: ContactNumberSchema;
            errorMessage: string;
        } = {
            contactNumber: {
                internationalNumber: true,
            },
            errorMessage: validationErrorMessage,
        };

        if (displayAsFixedCountryCode) {
            schema.contactNumber =
                defaultCountryCode === "Singapore"
                    ? { singaporeNumber: validationRule }
                    : { internationalNumber: defaultCountryCode };
        }

        return schema;
    };

    export const elementToSchema = (element: IContactFieldAttributes) => {
        const baseSchema = generateBaseSchema(element);
        const additionalValidationSchema =
            generateContactAdditionalValidationSchema(element);

        const {
            placeholder,
            enableClearButton,
            defaultCountryCode,
            displayAsFixedCountryCode,
        } = element;
        const contactSchema = {
            [element.id]: {
                ...baseSchema,
                ...(placeholder && {
                    placeholder,
                }),
                ...(enableClearButton && {
                    allowClear: true,
                }),
                ...(!displayAsFixedCountryCode &&
                    defaultCountryCode && {
                        defaultCountry: element.defaultCountryCode,
                    }),
                validation: [
                    ...(baseSchema.validation || []),
                    additionalValidationSchema,
                ],
            },
        };

        return contactSchema;
    };
}
