import { IContactFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import {
    EElementType,
    EValidationRuleFEEContact,
    EValidationType,
} from "src/context-providers";
import { ContactSchemaParser } from "src/translator/parse/elements";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("ContactSchemaParser", () => {
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

    it("should parse the placeholder correctly if present", () => {
        const placeholder = "This is a placeholder";

        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.CONTACT,
            placeholder,
            validation: [
                {
                    contactNumber: {
                        internationalNumber: true,
                    },
                    errorMessage: "Invalid contact number.",
                },
            ],
        })[ELEMENT_ID] as IContactFieldSchema;

        const parsedSchema = ContactSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        expect(parsedSchema).toHaveProperty("placeholder", placeholder);
    });

    it("should parse allowClear correctly to enableClearButton if present", () => {
        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.CONTACT,
            validation: [
                {
                    contactNumber: {
                        internationalNumber: true,
                    },
                    errorMessage: "Invalid contact number.",
                },
            ],
            allowClear: true,
        })[ELEMENT_ID] as IContactFieldSchema;

        const parsedSchema = ContactSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        expect(parsedSchema).toHaveProperty("enableClearButton", true);
    });

    it("should parse defaultCountry correctly to defaultCountryCode if present", () => {
        const defaultCountry = "Albania";
        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.CONTACT,
            validation: [
                {
                    contactNumber: {
                        internationalNumber: true,
                    },
                    errorMessage: "Invalid contact number.",
                },
            ],
            defaultCountry: defaultCountry,
        })[ELEMENT_ID] as IContactFieldSchema;

        const parsedSchema = ContactSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        expect(parsedSchema).toHaveProperty(
            "defaultCountryCode",
            defaultCountry
        );
    });

    it("should throw an error if additional validation is not defined", () => {
        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.CONTACT,
        })[ELEMENT_ID] as IContactFieldSchema;

        expect(() =>
            ContactSchemaParser.schemaToElement(mockSchema, ELEMENT_ID, {}, "")
        ).toThrowError("Contact schema must have additional validation.");
    });

    it("should throw an error if additional validation is defined but a valid contactNumber validation is not defined", () => {
        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.CONTACT,
            validation: [],
        })[ELEMENT_ID] as IContactFieldSchema;

        expect(() =>
            ContactSchemaParser.schemaToElement(mockSchema, ELEMENT_ID, {}, "")
        ).toThrowError(
            "Contact schema must define exactly one contactNumber validation."
        );
    });

    it("should throw an error if contactNumber validation is defined but either singaporeNumber or internationalNumber is not defined", () => {
        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.CONTACT,
            validation: [
                {
                    contactNumber: {} as any,
                    errorMessage: "Invalid contact number.",
                },
            ],
        })[ELEMENT_ID] as IContactFieldSchema;

        expect(() =>
            ContactSchemaParser.schemaToElement(mockSchema, ELEMENT_ID, {}, "")
        ).toThrowError(
            "Contact schema must have contactNumber validation with either singaporeNumber or internationalNumber."
        );
    });

    it("should throw an error if internationalNumber validation is defined for contactNumber but is set to false", () => {
        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.CONTACT,
            validation: [
                {
                    contactNumber: {
                        internationalNumber: false,
                    },
                    errorMessage: "Invalid contact number.",
                },
            ],
        })[ELEMENT_ID] as IContactFieldSchema;

        expect(() =>
            ContactSchemaParser.schemaToElement(mockSchema, ELEMENT_ID, {}, "")
        ).toThrowError(
            "Contact schema must set internationalNumber to true if it is defined."
        );
    });

    it.each`
        singaporeNumber | validationRule
        ${"default"}    | ${EValidationRuleFEEContact.DEFAULT}
        ${"house"}      | ${EValidationRuleFEEContact.HOUSE}
        ${"mobile"}     | ${EValidationRuleFEEContact.MOBILE}
    `(
        "should parse singaporeNumber $singaporeNumber validation correctly",
        ({ singaporeNumber, validationRule }) => {
            const defaultCountry = "Singapore";
            const mockSchema = generateMockElementSchema({
                id: ELEMENT_ID,
                label: {
                    mainLabel: MAIN_LABEL,
                    subLabel: SUB_LABEL,
                },
                uiType: EElementType.CONTACT,
                validation: [
                    {
                        contactNumber: {
                            singaporeNumber: singaporeNumber,
                        },
                        errorMessage: "Invalid contact number.",
                    },
                ],
            })[ELEMENT_ID] as IContactFieldSchema;

            const parsedSchema = ContactSchemaParser.schemaToElement(
                mockSchema,
                ELEMENT_ID,
                {}
            );

            expect(parsedSchema).toHaveProperty(
                "defaultCountryCode",
                defaultCountry
            );
            expect(parsedSchema).toHaveProperty(
                "displayAsFixedCountryCode",
                true
            );
            expect(parsedSchema).toHaveProperty("validation", [
                {
                    validationErrorMessage: "Invalid contact number.",
                    validationRule: validationRule,
                    validationType: EValidationType.CONTACT_NUMBER,
                },
            ]);
        }
    );

    it("should parse internationalNumber:true validation correctly", () => {
        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.CONTACT,
            validation: [
                {
                    contactNumber: {
                        internationalNumber: true,
                    },
                    errorMessage: "Invalid contact number.",
                },
            ],
        })[ELEMENT_ID] as IContactFieldSchema;

        const parsedSchema = ContactSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        expect(parsedSchema).toHaveProperty("defaultCountryCode", "");
        expect(parsedSchema).toHaveProperty("displayAsFixedCountryCode", false);
        expect(parsedSchema).toHaveProperty("validation", [
            {
                validationErrorMessage: "Invalid contact number.",
                validationType: EValidationType.CONTACT_NUMBER,
            },
        ]);
    });

    it("should parse internationalNumber with specified country validation correctly", () => {
        const defaultCountry = "Albania";
        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.CONTACT,
            validation: [
                {
                    contactNumber: {
                        internationalNumber: defaultCountry,
                    },
                    errorMessage: "Invalid contact number.",
                },
            ],
        })[ELEMENT_ID] as IContactFieldSchema;

        const parsedSchema = ContactSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        expect(parsedSchema).toHaveProperty(
            "defaultCountryCode",
            defaultCountry
        );
        expect(parsedSchema).toHaveProperty("displayAsFixedCountryCode", true);
        expect(parsedSchema).toHaveProperty("validation", [
            {
                validationErrorMessage: "Invalid contact number.",
                validationType: EValidationType.CONTACT_NUMBER,
            },
        ]);
    });
});

// =============================================================================
// HELPERS
// =============================================================================
const ELEMENT_ID = "mock123";
const MAIN_LABEL = "This is a label";
const SUB_LABEL = "This is a sub label";
