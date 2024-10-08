import { ITextFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import {
    EElementType,
    EValidationType,
    IValidation,
} from "src/context-providers";
import { TextSchemaParser } from "src/translator/parse/elements";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("TextSchemaParser", () => {
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
            uiType: EElementType.TEXT,
            placeholder,
        })[ELEMENT_ID] as ITextFieldSchema;

        const parsedSchema = TextSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        expect(parsedSchema).toHaveProperty("placeholder", placeholder);
    });

    it("should parse the matches validation type correctly if present", () => {
        const matches = "/^(hello)/";
        const matchesErrorMessage = "Matches error message";

        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXT,
            validation: [
                {
                    matches: matches,
                    errorMessage: matchesErrorMessage,
                },
            ],
        })[ELEMENT_ID] as ITextFieldSchema;

        const parsedSchema = TextSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        const expectedParsedValidation: IValidation[] = [
            {
                validationType: EValidationType.CUSTOM_REGEX,
                validationRule: matches,
                validationErrorMessage: matchesErrorMessage,
            },
        ];

        expect(parsedSchema).toHaveProperty(
            "validation",
            expectedParsedValidation
        );
    });

    it("should parse the min validation type correctly if present", () => {
        const minErrorMessage = "Min error message";

        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXT,
            validation: [
                {
                    min: 5,
                    errorMessage: minErrorMessage,
                },
            ],
        })[ELEMENT_ID] as ITextFieldSchema;

        const parsedSchema = TextSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        const expectedParsedValidation: IValidation[] = [
            {
                validationType: EValidationType.MIN_LENGTH,
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
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXT,
            validation: [
                {
                    max: 10,
                    errorMessage: maxErrorMessage,
                },
            ],
        })[ELEMENT_ID] as ITextFieldSchema;

        const parsedSchema = TextSchemaParser.schemaToElement(
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
});

// =============================================================================
// HELPERS
// =============================================================================
const ELEMENT_ID = "mock123";
const MAIN_LABEL = "This is a label";
const SUB_LABEL = "This is a sub label";
