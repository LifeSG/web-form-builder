import { EElementType, IPrefillAttributes } from "src/context-providers";
import { parseBaseSchema } from "src/translator/parse/common";
import { TElementSchema } from "src/translator/parse/types";
import { generateMockElement, generateMockElementSchema } from "../../helper";

describe("ParseBaseSchema", () => {
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

    it("should parse the base schema and return the base attributes of an element", () => {
        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.TEXT,
        })[elementId] as TElementSchema;

        const parsedSchema = parseBaseSchema(
            mockSchema,
            elementId,
            {},
            undefined
        );

        const expectedParsedSchema = generateMockElement({
            id: elementId,
            label: mainLabel,
            description: subLabel,
            type: EElementType.TEXT,
            required: false,
            requiredErrorMsg: "",
            internalId: parsedSchema.internalId,
            conditionalRendering: [],
            prefill: [],
            preselectedValue: "",
        })[parsedSchema.internalId];

        expect(parsedSchema).toEqual(expectedParsedSchema);
    });

    it("should parse the required validation correctly if it is present", () => {
        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.TEXT,
            validation: [
                {
                    required: true,
                    errorMessage: "This is a required field",
                },
            ],
        })[elementId] as TElementSchema;

        const parsedSchema = parseBaseSchema(
            mockSchema,
            elementId,
            {},
            undefined
        );

        expect(parsedSchema).toHaveProperty("required", true);
        expect(parsedSchema).toHaveProperty(
            "requiredErrorMsg",
            "This is a required field"
        );
    });

    it("should parse the conditional rendering schema correctly if it is present", () => {
        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.TEXT,
            showIf: [
                {
                    [elementId]: [
                        {
                            equals: "test",
                        },
                    ],
                },
            ],
        })[elementId] as TElementSchema;

        const parsedSchema = parseBaseSchema(
            mockSchema,
            elementId,
            {},
            undefined
        );

        expect(parsedSchema).toHaveProperty("conditionalRendering", [
            {
                fieldKey: elementId,
                comparator: "Equals",
                value: "test",
                internalId: "",
            },
        ]);
    });

    it("should parse the prefill schema correctly if it is present", () => {
        const prefill: IPrefillAttributes[] = [
            {
                prefillMode: "Myinfo",
                path: "testpath",
            },
        ];
        const mockSchema = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.TEXT,
        })[elementId] as TElementSchema;

        const parsedSchema = parseBaseSchema(
            mockSchema,
            elementId,
            {
                [elementId]: prefill,
            },
            undefined
        );

        expect(parsedSchema).toHaveProperty("prefill", prefill);
    });
});

// =============================================================================
// HELPERS
// =============================================================================
const elementId = "mock123";
const mainLabel = "This is a label";
const subLabel = "This is a sub label";
