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

    it("should parse every validation type correctly if all present", () => {
        const elementId = "mock123";
        const mainLabel = "This is a label";
        const subLabel = "This is a sub label";

        const minErrorMessage = "Min error message";
        const maxErrorMessage = "Max error message";
        const integerErrorMessage = "Matches error message";

        const MOCK_SCHEMA = generateMockElementSchema({
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
                {
                    max: 10,
                    errorMessage: maxErrorMessage,
                },
                {
                    integer: true,
                    errorMessage: integerErrorMessage,
                },
            ],
        })[elementId] as INumericFieldSchema;

        const parsedSchema = NumericSchemaParser.schemaToElement(
            MOCK_SCHEMA,
            elementId,
            {}
        );

        const expectedParsedValidation: IValidation[] = [
            {
                validationType: EValidationType.MIN_VALUE,
                validationRule: "5",
                validationErrorMessage: minErrorMessage,
            },
            {
                validationType: EValidationType.MAX_VALUE,
                validationRule: "10",
                validationErrorMessage: maxErrorMessage,
            },
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
