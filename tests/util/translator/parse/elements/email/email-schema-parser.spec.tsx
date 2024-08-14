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

    it("should parse the email validation correctly if it is present", () => {
        const elementId = "mock123";
        const mainLabel = "This is a label";
        const subLabel = "This is a sub label";

        const regex = "/^[a-zA-Z0-9._%+-]+@(gmail\\.com|hotmail\\.com)$/";
        const errorMessage = "This is an error message";

        const MOCK_SCHEMA = generateMockElementSchema({
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
            MOCK_SCHEMA,
            elementId,
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
