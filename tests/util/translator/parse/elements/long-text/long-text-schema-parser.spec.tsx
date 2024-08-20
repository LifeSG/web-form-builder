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

    it("should parse max validation type correctly if present", () => {
        const elementId = "mock123";
        const mainLabel = "This is a label";
        const subLabel = "This is a sub label";

        const maxErrorMessage = "Max error message";

        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.TEXTAREA,
            validation: [
                {
                    max: 10,
                    errorMessage: maxErrorMessage,
                },
            ],
        })[elementId] as ITextareaSchema;

        const parsedSchema = LongTextSchemaParser.schemaToElement(
            mockSchema,
            elementId,
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
