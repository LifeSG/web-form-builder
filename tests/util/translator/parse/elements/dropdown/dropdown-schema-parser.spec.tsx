import { ISelectSchema } from "@lifesg/web-frontend-engine/components/fields";
import { EElementType, IDropdownItemAttributes } from "src/context-providers";
import { DropdownSchemaParser } from "src/translator/parse/elements";
import { generateMockElementSchema } from "tests/util/translator/helper";

describe("DropdownSchemaParser", () => {
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
            uiType: EElementType.DROPDOWN,
            placeholder,
            dropdownItems: [
                {
                    value: "1",
                    label: "Option 1",
                },
                {
                    value: "2",
                    label: "Option 2",
                },
            ],
        })[elementId] as ISelectSchema;

        const parsedSchema = DropdownSchemaParser.schemaToElement(
            mockSchema,
            elementId,
            {},
            undefined
        );

        expect(parsedSchema).toHaveProperty("placeholder", placeholder);
    });

    it("should parse dropdown items correctly", () => {
        const dropdownItems: IDropdownItemAttributes[] = [
            {
                value: "1",
                label: "Option 1",
            },
            {
                value: "2",
                label: "Option 2",
            },
        ];

        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.DROPDOWN,
            dropdownItems,
        })[elementId] as ISelectSchema;

        const parsedSchema = DropdownSchemaParser.schemaToElement(
            mockSchema,
            elementId,
            {},
            undefined
        );

        expect(parsedSchema).toHaveProperty("dropdownItems", dropdownItems);
    });

    it("should throw an error if dropdown schema does not have options defined", () => {
        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.DROPDOWN,
        })[elementId] as ISelectSchema;

        expect(() =>
            DropdownSchemaParser.schemaToElement(
                mockSchema,
                elementId,
                {},
                undefined
            )
        ).toThrow("Dropdown schema must have at least 2 options");
    });

    it("should throw an error if dropdown schema has options defined but there is less than 2 options", () => {
        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.DROPDOWN,
            dropdownItems: [
                {
                    value: "1",
                    label: "Option 1",
                },
            ],
        })[elementId] as ISelectSchema;

        expect(() =>
            DropdownSchemaParser.schemaToElement(
                mockSchema,
                elementId,
                {},
                undefined
            )
        ).toThrow("Dropdown schema must have at least 2 options");
    });
});

// =============================================================================
// HELPERS
// =============================================================================
const elementId = "mock123";
const mainLabel = "This is a label";
const subLabel = "This is a sub label";
