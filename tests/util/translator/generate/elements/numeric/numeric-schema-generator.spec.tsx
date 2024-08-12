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

    it("should generate the base schema WITHOUT validation if required is false", () => {
        const MOCK_ELEMENT: INumericField = {
            label,
            id: elementId,
            internalId: "numeric-field",
            type: EElementType.NUMERIC,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
        };

        const generatedSchema =
            NumericSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.NUMERIC,
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema WITH validation if required is true", () => {
        const MOCK_ELEMENT: INumericField = {
            label,
            id: elementId,
            internalId: "long-text-field",
            type: EElementType.NUMERIC,
            required: true,
            requiredErrorMsg,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
        };

        const generatedSchema =
            NumericSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.NUMERIC,
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
        const validationRule = "5";
        const validationErrorMessage = "The max value for this field is 5";

        const MOCK_ELEMENT: INumericField = {
            label,
            id: elementId,
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
            NumericSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
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

        const MOCK_ELEMENT: INumericField = {
            label,
            id: elementId,
            internalId: "numeric-field",
            type: EElementType.NUMERIC,
            required: true,
            requiredErrorMsg,
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
            NumericSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.NUMERIC,
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
                    integer: true,
                    errorMessage: validationWholeNumbersErrorMessage,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the schema with conditional rendering if conditional rendering is added", () => {
        const MOCK_ELEMENT: INumericField = {
            label,
            id: elementId,
            internalId: "numeric-field",
            type: EElementType.NUMERIC,
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
            NumericSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.NUMERIC,
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
const label = "Numbers";
const requiredErrorMsg = "This field is required";
