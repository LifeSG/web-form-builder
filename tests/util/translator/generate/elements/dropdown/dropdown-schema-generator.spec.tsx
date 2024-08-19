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

    it("should generate the base schema with placeholder if placeholder is added", () => {
        const placeholder = "This is a placeholder";

        const MOCK_ELEMENT: IDropdown = {
            label,
            id: elementId,
            internalId: "dropdown-field",
            type: EElementType.DROPDOWN,
            required: false,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            placeholder,
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

        expect(generatedSchema[elementId]).toHaveProperty(
            "placeholder",
            placeholder
        );
    });

    it("should generate the base schema with options if dropdown items are added", () => {
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
