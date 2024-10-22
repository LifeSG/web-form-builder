import {
    EElementType,
    EValidationRuleFEEContact,
    EValidationType,
    IContactFieldAttributes,
} from "src/context-providers";
import { ContactSchemaGenerator } from "src/translator";

describe("ContactSchemaGenerator", () => {
    beforeEach(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should generate the schema with placeholder if placeholder is added", () => {
        const placeholder = "This is a placeholder";

        const mockElement: IContactFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "contact-field",
            type: EElementType.CONTACT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            enableClearButton: true,
            defaultCountryCode: "",
            validation: [
                {
                    validationType: EValidationType.CONTACT_NUMBER,
                    validationErrorMessage: "Invalid contact number.",
                },
            ],
            placeholder,
        };

        const generatedSchema =
            ContactSchemaGenerator.elementToSchema(mockElement);

        expect(generatedSchema[ELEMENT_ID]).toHaveProperty(
            "placeholder",
            placeholder
        );
    });

    it("should generate the schema with allowClear if enableClearButton is true", () => {
        const mockElement: IContactFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "contact-field",
            type: EElementType.CONTACT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            enableClearButton: true,
            defaultCountryCode: "",
            validation: [
                {
                    validationType: EValidationType.CONTACT_NUMBER,
                    validationErrorMessage: "Invalid contact number.",
                },
            ],
        };

        const generatedSchema =
            ContactSchemaGenerator.elementToSchema(mockElement);

        expect(generatedSchema[ELEMENT_ID]).toHaveProperty("allowClear", true);
    });

    it("should generate the schema without if enableClearButton is false", () => {
        const mockElement: IContactFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "contact-field",
            type: EElementType.CONTACT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            enableClearButton: false,
            defaultCountryCode: "",
            validation: [
                {
                    validationType: EValidationType.CONTACT_NUMBER,
                    validationErrorMessage: "Invalid contact number.",
                },
            ],
        };

        const generatedSchema =
            ContactSchemaGenerator.elementToSchema(mockElement);

        expect(generatedSchema[ELEMENT_ID]).not.toHaveProperty("allowClear");
    });

    it("should generate the schema with defaultCountry if displayAsFixedCountryCode is false and defaultCountryCode is specified", () => {
        const defaultCountry = "Albania";
        const mockElement: IContactFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "contact-field",
            type: EElementType.CONTACT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            enableClearButton: true,
            displayAsFixedCountryCode: false,
            defaultCountryCode: defaultCountry,
            validation: [
                {
                    validationType: EValidationType.CONTACT_NUMBER,
                    validationErrorMessage: "Invalid contact number.",
                },
            ],
        };

        const generatedSchema =
            ContactSchemaGenerator.elementToSchema(mockElement);

        expect(generatedSchema[ELEMENT_ID]).toHaveProperty(
            "defaultCountry",
            defaultCountry
        );
    });

    it("should not generate the schema with defaultCountry if displayAsFixedCountryCode is true and defaultCountryCode is specified", () => {
        const defaultCountry = "Albania";
        const mockElement: IContactFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "contact-field",
            type: EElementType.CONTACT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            enableClearButton: true,
            displayAsFixedCountryCode: true,
            defaultCountryCode: defaultCountry,
            validation: [
                {
                    validationType: EValidationType.CONTACT_NUMBER,
                    validationErrorMessage: "Invalid contact number.",
                },
            ],
        };

        const generatedSchema =
            ContactSchemaGenerator.elementToSchema(mockElement);

        expect(generatedSchema[ELEMENT_ID]).not.toHaveProperty(
            "defaultCountry"
        );
    });

    it("should generate the schema with internationalNumber:true validation if displayAsFixedCountryCode is false", () => {
        const mockElement: IContactFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "contact-field",
            type: EElementType.CONTACT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            enableClearButton: true,
            displayAsFixedCountryCode: false,
            defaultCountryCode: "",
            validation: [
                {
                    validationType: EValidationType.CONTACT_NUMBER,
                    validationErrorMessage: "Invalid contact number.",
                },
            ],
        };

        const generatedSchema =
            ContactSchemaGenerator.elementToSchema(mockElement);

        expect(generatedSchema[ELEMENT_ID]).toHaveProperty("validation", [
            {
                contactNumber: { internationalNumber: true },
                errorMessage: "Invalid contact number.",
            },
        ]);
    });

    it("should generate the schema with internationalNumber with specific country validation if displayAsFixedCountryCode is true and any defaultCountryCode (except Singapore) is specified", () => {
        const defaultCountry = "Albania";
        const mockElement: IContactFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "contact-field",
            type: EElementType.CONTACT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            enableClearButton: true,
            displayAsFixedCountryCode: true,
            defaultCountryCode: defaultCountry,
            validation: [
                {
                    validationType: EValidationType.CONTACT_NUMBER,
                    validationErrorMessage: "Invalid contact number.",
                },
            ],
        };

        const generatedSchema =
            ContactSchemaGenerator.elementToSchema(mockElement);

        expect(generatedSchema[ELEMENT_ID]).toHaveProperty("validation", [
            {
                contactNumber: { internationalNumber: defaultCountry },
                errorMessage: "Invalid contact number.",
            },
        ]);
    });

    it.each`
        validationRule
        ${EValidationRuleFEEContact.DEFAULT}
        ${EValidationRuleFEEContact.HOUSE}
        ${EValidationRuleFEEContact.MOBILE}
    `(
        "should generate the schema with singaporeNumber $validationRule validation when displayAsFixedCountryCode is true and defaultCountryCode is Singapore",
        ({ validationRule }) => {
            const mockElement: IContactFieldAttributes = {
                label: LABEL,
                id: ELEMENT_ID,
                internalId: "contact-field",
                type: EElementType.CONTACT,
                required: false,
                columns: { desktop: 12, tablet: 8, mobile: 4 },
                enableClearButton: true,
                displayAsFixedCountryCode: true,
                defaultCountryCode: "Singapore",
                validation: [
                    {
                        validationType: EValidationType.CONTACT_NUMBER,
                        validationRule: validationRule,
                        validationErrorMessage: "Invalid contact number.",
                    },
                ],
            };

            const generatedSchema =
                ContactSchemaGenerator.elementToSchema(mockElement);

            expect(generatedSchema[ELEMENT_ID]).toHaveProperty("validation", [
                {
                    contactNumber: {
                        singaporeNumber: validationRule,
                    },
                    errorMessage: "Invalid contact number.",
                },
            ]);
        }
    );
});

// =============================================================================
// HELPERS
// =============================================================================

const ELEMENT_ID = "mockId123";
const LABEL = "Contact";
