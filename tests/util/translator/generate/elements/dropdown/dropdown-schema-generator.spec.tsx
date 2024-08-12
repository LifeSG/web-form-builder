import { EElementType, IDropdown } from "src/context-providers";
import { DropdownSchemaGenerator } from "src/translator/generate";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("DropdownSchemaGenerator", () => {
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
        const MOCK_ELEMENT: IDropdown = {
            label,
            id: elementId,
            internalId: "dropdown-field",
            type: EElementType.DROPDOWN,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            dropdownItems: [],
        };

        const generatedSchema =
            DropdownSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.DROPDOWN,
            dropdownItems: [],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the base schema WITH validation if required is true", () => {
        const MOCK_ELEMENT: IDropdown = {
            label,
            id: elementId,
            internalId: "dropdown-field",
            type: EElementType.DROPDOWN,
            required: true,
            requiredErrorMsg,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            dropdownItems: [],
        };

        const generatedSchema =
            DropdownSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.DROPDOWN,
            validation: [
                {
                    required: true,
                    errorMessage: requiredErrorMsg,
                },
            ],
            dropdownItems: [],
        });

        expect(generatedSchema).toStrictEqual(expectedSchema);
    });

    it("should generate the schema with conditional rendering if conditional rendering is added", () => {
        const MOCK_ELEMENT: IDropdown = {
            label,
            id: elementId,
            internalId: "dropdown-field",
            type: EElementType.DROPDOWN,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            conditionalRendering: [
                {
                    fieldKey: "mock456",
                    comparator: "Equals",
                    value: "hello",
                    internalId: "mock456",
                },
            ],
            dropdownItems: [],
        };

        const generatedSchema =
            DropdownSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.DROPDOWN,
            dropdownItems: [],
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

    it("should generate the base schema with dropdown items if dropdown items are added", () => {
        const MOCK_ELEMENT: IDropdown = {
            label,
            id: elementId,
            internalId: "dropdown-field",
            type: EElementType.DROPDOWN,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            dropdownItems: [
                {
                    label: "Option 1",
                    value: "option1",
                },
                {
                    label: "Option 2",
                    value: "option2",
                },
            ],
        };

        const generatedSchema =
            DropdownSchemaGenerator.elementToSchema(MOCK_ELEMENT);

        const expectedSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel: label,
            },
            uiType: EElementType.DROPDOWN,
            dropdownItems: [
                {
                    label: "Option 1",
                    value: "option1",
                },
                {
                    label: "Option 2",
                    value: "option2",
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
const label = "dropdown-field";
const requiredErrorMsg = "This field is required";
