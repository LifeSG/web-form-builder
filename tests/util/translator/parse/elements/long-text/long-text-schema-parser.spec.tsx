import { ITextareaSchema } from "@lifesg/web-frontend-engine/components/fields";
import {
    EElementType,
    EValidationType,
    IValidation,
} from "src/context-providers";
import { LongTextSchemaParser } from "src/translator/parse/elements";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("LongTextSchemaParser", () => {
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
            uiType: EElementType.TEXTAREA,
            placeholder,
        })[ELEMENT_ID] as ITextareaSchema;

        const parsedSchema = LongTextSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        expect(parsedSchema).toHaveProperty("placeholder", placeholder);
    });

    it("should parse max validation type correctly if present", () => {
        const maxErrorMessage = "Max error message";

        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXTAREA,
            validation: [
                {
                    max: 10,
                    errorMessage: maxErrorMessage,
                },
            ],
        })[ELEMENT_ID] as ITextareaSchema;

        const parsedSchema = LongTextSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        const expectedParsedValidation: IValidation[] = [
            {
                validationType: EValidationType.MAX_LENGTH,
                validationRule: "10",
                validationErrorMessage: maxErrorMessage,
            },
        ];

        expect(parsedSchema).toHaveProperty(
            "validation",
            expectedParsedValidation
        );
    });

    it("should parse resizable correctly to resizeableInput if present", () => {
        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXTAREA,
            resizable: true,
        })[ELEMENT_ID] as ITextareaSchema;

        const parsedSchema = LongTextSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {},
            undefined
        );

        expect(parsedSchema).toHaveProperty("resizableInput", true);
    });

    it("should parse resizable to resizeableInput as false if not present", () => {
        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXTAREA,
        })[ELEMENT_ID] as ITextareaSchema;

        const parsedSchema = LongTextSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {},
            undefined
        );

        expect(parsedSchema).toHaveProperty("resizableInput", false);
    });

    it("should throw an error if chipTexts is defined but has less than 2 items", () => {
        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXTAREA,
            chipTexts: ["Chip text"],
        })[ELEMENT_ID] as ITextareaSchema;

        expect(() =>
            LongTextSchemaParser.schemaToElement(mockSchema, ELEMENT_ID, {}, "")
        ).toThrow(
            "Long text area schema must have at least 2 chip texts if chipTexts is defined"
        );
    });

    it("should parse chipTexts to pillItems and set pills to true if present", () => {
        const chipTexts = ["Chip text 1", "Chip text 2"];

        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXTAREA,
            chipTexts,
        })[ELEMENT_ID] as ITextareaSchema;

        const parsedSchema = LongTextSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {},
            undefined
        );

        const expectedPillItems = chipTexts.map((content) => ({ content }));

        expect(parsedSchema).toHaveProperty("pills", true);
        expect(parsedSchema).toHaveProperty("pillItems", expectedPillItems);
    });
});

// =============================================================================
// HELPERS
// =============================================================================
const ELEMENT_ID = "mock123";
const MAIN_LABEL = "This is a label";
const SUB_LABEL = "This is a sub label";
