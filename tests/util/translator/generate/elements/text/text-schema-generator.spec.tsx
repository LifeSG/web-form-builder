import {
    EElementType,
    EValidationType,
    ITextField,
} from "src/context-providers";
import { TextSchemaGenerator } from "src/translator/generate";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("TextSchemaGenerator", () => {
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

        const MOCK_ELEMENT: ITextField = {
            label,
            id: elementId,
            internalId: "text-field",
            type: EElementType.TEXT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
            placeholder,
        };

        const generatedSchema =
            TextSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        expect(generatedSchema[elementId]).toHaveProperty(
            "placeholder",
            placeholder
        );
    });

    it("should generate the base schema WITH only additional validation if additional validation is added but required is false", () => {
        const validationRule = "5";
        const validationErrorMessage =
            "This field must be at least 5 characters long";

        const MOCK_ELEMENT: ITextField = {
            label,
            id: elementId,
            internalId: "text-field",
            type: EElementType.TEXT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [
                {
                    validationType: EValidationType.MIN_LENGTH,
                    validationRule,
                    validationErrorMessage,
                },
            ],
        };

        const generatedSchema =
            TextSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.TEXT,
            validation: [
                {
                    min: parseInt(validationRule),
                    errorMessage: validationErrorMessage,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema WITH required & additional validation if every additional validation is added and required is true", () => {
        const validationMinRule = "5";
        const validationMinErrorMessage =
            "This field must be at least 5 characters long";

        const validationMaxRule = "10";
        const validationMaxErrorMessage =
            "This field must be at most 10 characters long";

        const validationRegexRule = "/^(hello)/";
        const validationRegexErrorMessage =
            "This field must start with 'hello'";

        const MOCK_ELEMENT: ITextField = {
            label,
            id: elementId,
            internalId: "text-field",
            type: EElementType.TEXT,
            required: true,
            requiredErrorMsg,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [
                {
                    validationType: EValidationType.MIN_LENGTH,
                    validationRule: validationMinRule,
                    validationErrorMessage: validationMinErrorMessage,
                },
                {
                    validationType: EValidationType.MAX_LENGTH,
                    validationRule: validationMaxRule,
                    validationErrorMessage: validationMaxErrorMessage,
                },
                {
                    validationType: EValidationType.CUSTOM_REGEX,
                    validationRule: validationRegexRule,
                    validationErrorMessage: validationRegexErrorMessage,
                },
            ],
        };

        const generatedSchema =
            TextSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.TEXT,
            validation: [
                {
                    required: true,
                    errorMessage: requiredErrorMsg,
                },
                {
                    min: parseInt(validationMinRule),
                    errorMessage: validationMinErrorMessage,
                },
                {
                    max: parseInt(validationMaxRule),
                    errorMessage: validationMaxErrorMessage,
                },
                {
                    matches: validationRegexRule,
                    errorMessage: validationRegexErrorMessage,
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
const label = "Text Field";
const requiredErrorMsg = "This field is required";
