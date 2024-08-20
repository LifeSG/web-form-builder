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
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.EMAIL,
            placeholder,
        })[elementId] as IEmailFieldSchema;

        const parsedSchema = EmailSchemaParser.schemaToElement(
            mockSchema,
            elementId,
            {},
            undefined
        );

        expect(parsedSchema).toHaveProperty("placeholder", placeholder);
    });

    it("should parse the email validation correctly if it is present", () => {
        const regex = "/^[a-zA-Z0-9._%+-]+@(gmail\\.com|hotmail\\.com)$/";
        const errorMessage = "This is an error message";

        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.EMAIL,
            validation: [
                {
                    matches: regex,
                    errorMessage,
                },
            ],
        })[elementId] as IEmailFieldSchema;

        const parsedSchema = EmailSchemaParser.schemaToElement(
            mockSchema,
            elementId,
            {},
            undefined
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
const elementId = "mock123";
const mainLabel = "This is a label";
const subLabel = "This is a sub label";
