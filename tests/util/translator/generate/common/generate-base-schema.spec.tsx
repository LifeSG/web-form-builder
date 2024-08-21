import { EElementType, ITextField } from "src/context-providers";
import { TextSchemaGenerator } from "src/translator/generate";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("GenerateBaseSchema", () => {
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

    it("should generate the full base schema if everything is provided", () => {
        const mockElement: ITextField = {
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            label: LABEL,
            description: "This is a description",
            id: ELEMENT_ID,
            internalId: "text-field",
            type: EElementType.TEXT,
            required: true,
            requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
            placeholder: "Enter your text here",
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
            TextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
                subLabel: "This is a description",
            },
            placeholder: "Enter your text here",
            uiType: EElementType.TEXT,
            validation: [
                {
                    required: true,
                    errorMessage: REQUIRED_ERROR_MESSAGE,
                },
            ],
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

    it("should generate the base schema without placeholder if placeholder is not provided", () => {
        const mockElement: ITextField = {
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            label: LABEL,
            description: DESCRIPTION,
            id: ELEMENT_ID,
            internalId: "text-field",
            type: EElementType.TEXT,
            required: true,
            requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
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
            TextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
                subLabel: DESCRIPTION,
            },
            uiType: EElementType.TEXT,
            validation: [
                {
                    required: true,
                    errorMessage: REQUIRED_ERROR_MESSAGE,
                },
            ],
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

    it("should generate the base schema without showIf if conditional rendering is not provided", () => {
        const mockElement: ITextField = {
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            label: LABEL,
            description: DESCRIPTION,
            id: ELEMENT_ID,
            internalId: "text-field",
            type: EElementType.TEXT,
            required: true,
            requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
            placeholder: "Enter your text here",
            validation: [],
        };

        const generatedSchema =
            TextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
                subLabel: DESCRIPTION,
            },
            placeholder: "Enter your text here",
            uiType: EElementType.TEXT,
            validation: [
                {
                    required: true,
                    errorMessage: REQUIRED_ERROR_MESSAGE,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema without subLabel if description is not provided", () => {
        const mockElement: ITextField = {
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "text-field",
            type: EElementType.TEXT,
            required: true,
            requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
            placeholder: "Enter your text here",
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
            TextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
            },
            placeholder: "Enter your text here",
            uiType: EElementType.TEXT,
            validation: [
                {
                    required: true,
                    errorMessage: REQUIRED_ERROR_MESSAGE,
                },
            ],
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

    it("should generate the base schema without validation if required and requiredErrorMsg is not provided", () => {
        const mockElement: ITextField = {
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            label: LABEL,
            description: DESCRIPTION,
            id: ELEMENT_ID,
            internalId: "text-field",
            type: EElementType.TEXT,
            required: false,
            placeholder: "Enter your text here",
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
            TextSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
                subLabel: DESCRIPTION,
            },
            placeholder: "Enter your text here",
            uiType: EElementType.TEXT,
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
const LABEL = "Text Field";
const DESCRIPTION = "This is a description";
const REQUIRED_ERROR_MESSAGE = "This field is required";
