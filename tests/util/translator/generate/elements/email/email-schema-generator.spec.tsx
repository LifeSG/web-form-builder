import {
    EElementType,
    EValidationType,
    IEmailField,
} from "src/context-providers";
import { EmailSchemaGenerator } from "src/translator/generate";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("EmailSchemaGenerator", () => {
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

    it("should generate the base schema WITHOUT validation if required is false", () => {
        const MOCK_ELEMENT: IEmailField = {
            label,
            id: elementId,
            internalId: "email-field",
            type: EElementType.EMAIL,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
        };

        const generatedSchema =
            EmailSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.EMAIL,
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema WITH validation if required is true", () => {
        const MOCK_ELEMENT: IEmailField = {
            label,
            id: elementId,
            internalId: "email-field",
            type: EElementType.EMAIL,
            required: true,
            requiredErrorMsg,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
        };

        const generatedSchema =
            EmailSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.EMAIL,
            validation: [
                {
                    required: true,
                    errorMessage: requiredErrorMsg,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema WITH only additional validation if additional validation is added but required is false", () => {
        const validationRule = "@gmail.com";
        const validationErrorMessage =
            "This field only accepts gmail addresses";

        const MOCK_ELEMENT: IEmailField = {
            label,
            id: elementId,
            internalId: "email-field",
            type: EElementType.EMAIL,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [
                {
                    validationType: EValidationType.EMAIL_DOMAIN,
                    validationRule,
                    validationErrorMessage,
                },
            ],
        };

        const generatedSchema =
            EmailSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.EMAIL,
            validation: [
                {
                    matches: "/^[a-zA-Z0-9._%+-]+@(gmail\\.com)$/",
                    errorMessage: validationErrorMessage,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema WITH required & additional validation for if every additional validation is added and required is true", () => {
        const validationRule = "@gmail.com";
        const validationErrorMessage =
            "This field only accepts gmail addresses";

        const MOCK_ELEMENT: IEmailField = {
            label,
            id: elementId,
            internalId: "numeric-field",
            type: EElementType.EMAIL,
            required: true,
            requiredErrorMsg,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [
                {
                    validationType: EValidationType.EMAIL_DOMAIN,
                    validationRule,
                    validationErrorMessage,
                },
            ],
        };

        const generatedSchema =
            EmailSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.EMAIL,
            validation: [
                {
                    required: true,
                    errorMessage: requiredErrorMsg,
                },
                {
                    matches: "/^[a-zA-Z0-9._%+-]+@(gmail\\.com)$/",
                    errorMessage: validationErrorMessage,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the schema with conditional rendering if conditional rendering is added", () => {
        const MOCK_ELEMENT: IEmailField = {
            label,
            id: elementId,
            internalId: "email-field",
            type: EElementType.EMAIL,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
            conditionalRendering: [
                {
                    fieldKey: "mock456",
                    comparator: "Equals",
                    value: "hello",
                    internalId: "mock456",
                },
            ],
        };

        const generatedSchema =
            EmailSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.EMAIL,
            showIf: [
                {
                    mock456: [
                        {
                            filled: true,
                        },
                        {
                            equals: "hello",
                        },
                    ],
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });
});

// =============================================================================
// HELPERS
// =============================================================================

const elementId = "mockId123";
const label = "email-field";
const requiredErrorMsg = "This field is required";
