import {
    EElementType,
    EValidationType,
    ITextFieldAttributes,
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

        const mockElement: ITextFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "text-field",
            type: EElementType.TEXT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
            placeholder,
        };

        const generatedSchema =
            TextSchemaGenerator.elementToSchema(mockElement);

        expect(generatedSchema[ELEMENT_ID]).toHaveProperty(
            "placeholder",
            placeholder
        );
    });

    it("should generate the base schema WITH only additional validation if additional validation is added but required is false", () => {
        const validationRule = "5";
        const validationErrorMessage =
            "This field must be at least 5 characters long";

        const mockElement: ITextFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
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
            TextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
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

        const mockElement: ITextFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "text-field",
            type: EElementType.TEXT,
            required: true,
            requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
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
            TextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
            },
            uiType: EElementType.TEXT,
            validation: [
                {
                    required: true,
                    errorMessage: REQUIRED_ERROR_MESSAGE,
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
const ELEMENT_ID = "mockId123";
const LABEL = "Text Field";
const REQUIRED_ERROR_MESSAGE = "This field is required";
