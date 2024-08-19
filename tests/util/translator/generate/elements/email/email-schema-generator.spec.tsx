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

    it("should generate the base schema with placeholder if placeholder is added", () => {
        const placeholder = "This is a placeholder";

        const MOCK_ELEMENT: IEmailField = {
            label,
            id: elementId,
            internalId: "email-field",
            type: EElementType.EMAIL,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
            placeholder,
        };

        const generatedSchema =
            EmailSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        expect(generatedSchema[elementId]).toHaveProperty(
            "placeholder",
            placeholder
        );
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

    it("should generate the base schema WITH required & additional validation if every additional validation is added and required is true", () => {
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
});

// =============================================================================
// HELPERS
// =============================================================================

const elementId = "mockId123";
const label = "email-field";
const requiredErrorMsg = "This field is required";
