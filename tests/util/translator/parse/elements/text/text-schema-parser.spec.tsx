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

    it("should parse every validation type correctly if all present", () => {
        const elementId = "mock123";
        const mainLabel = "This is a label";
        const subLabel = "This is a sub label";

        const matches = "/^(hello)/";
        const minErrorMessage = "Min error message";
        const maxErrorMessage = "Max error message";
        const matchesErrorMessage = "Matches error message";

        const MOCK_SCHEMA = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.TEXT,
            validation: [
                {
                    min: 5,
                    errorMessage: minErrorMessage,
                },
                {
                    max: 10,
                    errorMessage: maxErrorMessage,
                },
                {
                    matches: matches,
                    errorMessage: matchesErrorMessage,
                },
            ],
        })[elementId] as ITextFieldSchema;

        const parsedSchema = TextSchemaParser.schemaToElement(
            MOCK_SCHEMA,
            elementId,
            {}
        );

        const expectedParsedValidation: IValidation[] = [
            {
                validationType: EValidationType.MIN_LENGTH,
                validationRule: "5",
                validationErrorMessage: minErrorMessage,
            },
            {
                validationType: EValidationType.MAX_LENGTH,
                validationRule: "10",
                validationErrorMessage: maxErrorMessage,
            },
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
});
