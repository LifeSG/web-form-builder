import { EElementType, IContactField } from "src/context-providers";
import { ContactSchemaGenerator } from "src/translator/generate";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("ContactSchemaGenerator", () => {
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

    it("should generate the base schema WITHOUT validation if required is false", () => {
        const MOCK_ELEMENT: IContactField = {
            label,
            id: elementId,
            internalId: "contact-field",
            type: EElementType.CONTACT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
        };

        const generatedSchema =
            ContactSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.CONTACT,
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema WITH validation if required is true", () => {
        const MOCK_ELEMENT: IContactField = {
            label,
            id: elementId,
            internalId: "contact-field",
            type: EElementType.CONTACT,
            required: true,
            requiredErrorMsg,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
        };

        const generatedSchema =
            ContactSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.CONTACT,
            validation: [
                {
                    required: true,
                    errorMessage: requiredErrorMsg,
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the schema with conditional rendering if conditional rendering is added", () => {
        const MOCK_ELEMENT: IContactField = {
            label,
            id: elementId,
            internalId: "contact-field",
            type: EElementType.CONTACT,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            validation: [],
            conditionalRendering: [
                {
                    fieldKey: "mock456",
                    comparator: "Equals",
                    value: "hello",
                    internalId: "mock456",
                },
            ],
        };

        const generatedSchema =
            ContactSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.CONTACT,
            showIf: [
                {
                    mock456: [
                        {
                            filled: true,
                        },
                        {
                            equals: "hello",
                        },
                    ],
                },
            ],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });
});

// =============================================================================
// HELPERS
// =============================================================================
const elementId = "mockId123";
const label = "Contact Field";
const requiredErrorMsg = "This field is required";
