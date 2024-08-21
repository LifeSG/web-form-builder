import { IEmailFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import {
    EElementType,
    EValidationType,
    IValidation,
} from "src/context-providers";
import { EmailSchemaParser } from "src/translator/parse/elements";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("EmailSchemaParser", () => {
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
            uiType: EElementType.EMAIL,
            placeholder,
        })[ELEMENT_ID] as IEmailFieldSchema;

        const parsedSchema = EmailSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        expect(parsedSchema).toHaveProperty("placeholder", placeholder);
    });

    it("should parse the email validation correctly if it is present", () => {
        const regex = "/^[a-zA-Z0-9._%+-]+@(gmail\\.com|hotmail\\.com)$/";
        const errorMessage = "This is an error message";

        const mockSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.EMAIL,
            validation: [
                {
                    matches: regex,
                    errorMessage,
                },
            ],
        })[ELEMENT_ID] as IEmailFieldSchema;

        const parsedSchema = EmailSchemaParser.schemaToElement(
            mockSchema,
            ELEMENT_ID,
            {}
        );

        const expectedParsedValidation: IValidation[] = [
            {
                validationType: EValidationType.EMAIL_DOMAIN,
                validationRule: "@gmail.com, @hotmail.com",
                validationErrorMessage: errorMessage,
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
