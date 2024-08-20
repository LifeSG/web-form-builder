import { INumericFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import {
    EElementType,
    EValidationType,
    IValidation,
} from "src/context-providers";
import { NumericSchemaParser } from "src/translator/parse/elements";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("NumericSchemaParser", () => {
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
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.NUMERIC,
            placeholder,
        })[elementId] as INumericFieldSchema;

        const parsedSchema = NumericSchemaParser.schemaToElement(
            mockSchema,
            elementId,
            {},
            undefined
        );

        expect(parsedSchema).toHaveProperty("placeholder", placeholder);
    });

    it("should parse the min validation type correctly if present", () => {
        const minErrorMessage = "Min error message";

        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.NUMERIC,
            validation: [
                {
                    min: 5,
                    errorMessage: minErrorMessage,
                },
            ],
        })[elementId] as INumericFieldSchema;

        const parsedSchema = NumericSchemaParser.schemaToElement(
            mockSchema,
            elementId,
            {},
            undefined
        );

        const expectedParsedValidation: IValidation[] = [
            {
                validationType: EValidationType.MIN_VALUE,
                validationRule: "5",
                validationErrorMessage: minErrorMessage,
            },
        ];

        expect(parsedSchema).toHaveProperty(
            "validation",
            expectedParsedValidation
        );
    });

    it("should parse the max validation type correctly if present", () => {
        const maxErrorMessage = "Max error message";

        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.NUMERIC,
            validation: [
                {
                    max: 10,
                    errorMessage: maxErrorMessage,
                },
            ],
        })[elementId] as INumericFieldSchema;

        const parsedSchema = NumericSchemaParser.schemaToElement(
            mockSchema,
            elementId,
            {},
            undefined
        );

        const expectedParsedValidation: IValidation[] = [
            {
                validationType: EValidationType.MAX_VALUE,
                validationRule: "10",
                validationErrorMessage: maxErrorMessage,
            },
        ];

        expect(parsedSchema).toHaveProperty(
            "validation",
            expectedParsedValidation
        );
    });

    it("should parse the integers validation type correctly if present", () => {
        const integerErrorMessage = "Integer error message";

        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.NUMERIC,
            validation: [
                {
                    integer: true,
                    errorMessage: integerErrorMessage,
                },
            ],
        })[elementId] as INumericFieldSchema;

        const parsedSchema = NumericSchemaParser.schemaToElement(
            mockSchema,
            elementId,
            {},
            undefined
        );

        const expectedParsedValidation: IValidation[] = [
            {
                validationType: EValidationType.WHOLE_NUMBERS,
                validationErrorMessage: integerErrorMessage,
            },
        ];

        expect(parsedSchema).toHaveProperty(
            "validation",
            expectedParsedValidation
        );
    });
});

// =============================================================================
// HELPERS
// =============================================================================
const elementId = "mock123";
const mainLabel = "This is a label";
const subLabel = "This is a sub label";
