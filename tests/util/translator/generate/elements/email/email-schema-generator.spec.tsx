import {
    EElementType,
    EValidationType,
    IEmailFieldAttributes,
} from "src/context-providers";
import { EmailSchemaGenerator } from "src/translator/generate";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("EmailSchemaGenerator", () => {
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

    it("should generate the base schema with placeholder if placeholder is added", () => {
        const placeholder = "This is a placeholder";

        const mockElement: IEmailFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "email-field",
            type: EElementType.EMAIL,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
            placeholder,
        };

        const generatedSchema =
            EmailSchemaGenerator.elementToSchema(mockElement);

        expect(generatedSchema[ELEMENT_ID]).toHaveProperty(
            "placeholder",
            placeholder
        );
    });

    it("should generate the base schema WITH only additional validation if additional validation is added but required is false", () => {
        const validationRule = "@gmail.com";
        const validationErrorMessage =
            "This field only accepts gmail addresses";

        const mockElement: IEmailFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "email-field",
            type: EElementType.EMAIL,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [
                {
                    validationType: EValidationType.EMAIL_DOMAIN,
                    validationRule,
                    validationErrorMessage,
                },
            ],
        };

        const generatedSchema =
            EmailSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
            },
            uiType: EElementType.EMAIL,
            validation: [
                {
                    matches: "/^[a-zA-Z0-9._%+-]+@(gmail\\.com)$/",
                    errorMessage: validationErrorMessage,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema WITH required & additional validation if every additional validation is added and required is true", () => {
        const validationRule = "@gmail.com";
        const validationErrorMessage =
            "This field only accepts gmail addresses";

        const mockElement: IEmailFieldAttributes = {
            label: LABEL,
            id: ELEMENT_ID,
            internalId: "numeric-field",
            type: EElementType.EMAIL,
            required: true,
            requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [
                {
                    validationType: EValidationType.EMAIL_DOMAIN,
                    validationRule,
                    validationErrorMessage,
                },
            ],
        };

        const generatedSchema =
            EmailSchemaGenerator.elementToSchema(mockElement);

        const expectedSchema = generateMockElementSchema({
            id: ELEMENT_ID,
            label: {
                mainLabel: LABEL,
            },
            uiType: EElementType.EMAIL,
            validation: [
                {
                    required: true,
                    errorMessage: REQUIRED_ERROR_MESSAGE,
                },
                {
                    matches: "/^[a-zA-Z0-9._%+-]+@(gmail\\.com)$/",
                    errorMessage: validationErrorMessage,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });
});

// =============================================================================
// HELPERS
// =============================================================================

const ELEMENT_ID = "mockId123";
const LABEL = "email-field";
const REQUIRED_ERROR_MESSAGE = "This field is required";
