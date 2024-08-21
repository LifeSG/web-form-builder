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
            {},
            undefined
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
            {},
            undefined
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
});

// =============================================================================
// HELPERS
// =============================================================================
const ELEMENT_ID = "mock123";
const MAIN_LABEL = "This is a label";
const SUB_LABEL = "This is a sub label";
