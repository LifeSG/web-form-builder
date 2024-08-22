import {
    EElementType,
    EValidationType,
    ITextarea,
} from "src/context-providers";
import { LongTextSchemaGenerator } from "src/translator/generate";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("LongTextSchemaGenerator", () => {
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

        const mockElement: ITextarea = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "long-text-field",
            type: EElementType.TEXTAREA,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
            placeholder,
        };

        const generatedSchema =
            LongTextSchemaGenerator.elementToSchema(mockElement);

        expect(generatedSchema[ELEMENT_ID]).toHaveProperty(
            "placeholder",
            placeholder
        );
    });

    it("should generate the base schema WITHOUT validation if required is false", () => {
        const mockElement: ITextarea = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "long-text-field",
            type: EElementType.TEXTAREA,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
        };

        const generatedSchema =
            LongTextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
            },
            uiType: EElementType.TEXTAREA,
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema WITH validation if required is true", () => {
        const mockElement: ITextarea = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "long-text-field",
            type: EElementType.TEXTAREA,
            required: true,
            requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
        };

        const generatedSchema =
            LongTextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
            },
            uiType: EElementType.TEXTAREA,
            validation: [
                {
                    required: true,
                    errorMessage: REQUIRED_ERROR_MESSAGE,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema WITH only additional validation if additional validation is added but required is false", () => {
        const validationRule = "5";
        const validationErrorMessage =
            "This field must be at most 5 characters long";

        const mockElement: ITextarea = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "long-text-field",
            type: EElementType.TEXTAREA,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [
                {
                    validationType: EValidationType.MAX_LENGTH,
                    validationRule,
                    validationErrorMessage,
                },
            ],
        };

        const generatedSchema =
            LongTextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
            },
            uiType: EElementType.TEXTAREA,
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
        const validationMaxRule = "10";
        const validationMaxErrorMessage =
            "This field must be at most 10 characters long";

        const mockElement: ITextarea = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "text-field",
            type: EElementType.TEXTAREA,
            required: true,
            requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [
                {
                    validationType: EValidationType.MAX_LENGTH,
                    validationRule: validationMaxRule,
                    validationErrorMessage: validationMaxErrorMessage,
                },
            ],
        };

        const generatedSchema =
            LongTextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
            },
            uiType: EElementType.TEXTAREA,
            validation: [
                {
                    required: true,
                    errorMessage: REQUIRED_ERROR_MESSAGE,
                },

                {
                    max: parseInt(validationMaxRule),
                    errorMessage: validationMaxErrorMessage,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the schema with conditional rendering if conditional rendering is added", () => {
        const mockElement: ITextarea = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "long-text-field",
            type: EElementType.TEXTAREA,
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
            LongTextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
            },
            uiType: EElementType.TEXTAREA,
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

const ELEMENT_ID = "mockId123";
const LABEL = "Long text";
const REQUIRED_ERROR_MESSAGE = "This field is required";
