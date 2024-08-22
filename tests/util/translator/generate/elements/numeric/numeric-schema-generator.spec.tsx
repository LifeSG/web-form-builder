import {
    EElementType,
    EValidationType,
    INumericField,
} from "src/context-providers";
import { NumericSchemaGenerator } from "src/translator/generate";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("NumericSchemaGenerator", () => {
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

        const mockElement: INumericField = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "numeric-field",
            type: EElementType.NUMERIC,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
            placeholder,
        };

        const generatedSchema =
            NumericSchemaGenerator.elementToSchema(mockElement);

        expect(generatedSchema[ELEMENT_ID]).toHaveProperty(
            "placeholder",
            placeholder
        );
    });

    it("should generate the base schema WITH only additional validation if additional validation is added but required is false", () => {
        const validationRule = "5";
        const validationErrorMessage = "The max value for this field is 5";

        const mockElement: INumericField = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "numeric-field",
            type: EElementType.NUMERIC,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [
                {
                    validationType: EValidationType.MAX_VALUE,
                    validationRule,
                    validationErrorMessage,
                },
            ],
        };

        const generatedSchema =
            NumericSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
            },
            uiType: EElementType.NUMERIC,
            validation: [
                {
                    max: parseInt(validationRule),
                    errorMessage: validationErrorMessage,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema WITH required & additional validation if every additional validation is added and required is true", () => {
        const validationMinRule = "5";
        const validationMinErrorMessage = "The min value for this field is 5";
        const validationMaxRule = "10";
        const validationMaxErrorMessage = "The max value for this field is 10";
        const validationWholeNumbersErrorMessage =
            "This field only accepts whole numbers";

        const mockElement: INumericField = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "numeric-field",
            type: EElementType.NUMERIC,
            required: true,
            requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [
                {
                    validationType: EValidationType.MIN_VALUE,
                    validationRule: validationMinRule,
                    validationErrorMessage: validationMinErrorMessage,
                },
                {
                    validationType: EValidationType.MAX_VALUE,
                    validationRule: validationMaxRule,
                    validationErrorMessage: validationMaxErrorMessage,
                },
                {
                    validationType: EValidationType.WHOLE_NUMBERS,
                    validationErrorMessage: validationWholeNumbersErrorMessage,
                },
            ],
        };

        const generatedSchema =
            NumericSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
            },
            uiType: EElementType.NUMERIC,
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
                    integer: true,
                    errorMessage: validationWholeNumbersErrorMessage,
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
const LABEL = "Numbers";
const REQUIRED_ERROR_MESSAGE = "This field is required";
