import { EElementType, IPrefillAttributes } from "src/context-providers";
import { parseBaseSchema, TElementSchema } from "src/translator/parse";
import { generateMockElementSchema } from "../../helper";

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
        const MOCK_SCHEMA = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.TEXT,
        })[elementId] as TElementSchema;

        const parsedSchema = parseBaseSchema(MOCK_SCHEMA, elementId, {});

        // Check that the base attributes are present after parsing
        expect(parsedSchema).toHaveProperty("columns.desktop", 12);
        expect(parsedSchema).toHaveProperty("columns.tablet", 8);
        expect(parsedSchema).toHaveProperty("columns.mobile", 4);
        expect(parsedSchema).toHaveProperty("id", elementId);
        expect(parsedSchema).toHaveProperty("label", mainLabel);
        expect(parsedSchema).toHaveProperty("description", subLabel);
        expect(parsedSchema).toHaveProperty("type", EElementType.TEXT);
        expect(parsedSchema).toHaveProperty("required", false);
        expect(parsedSchema).toHaveProperty("requiredErrorMsg", "");
        expect(parsedSchema).toHaveProperty("internalId");
        expect(parsedSchema).toHaveProperty("conditionalRendering", []);
        expect(parsedSchema).toHaveProperty("prefill", []);
    });

    it("should parse the required validation correctly if it is present", () => {
        const MOCK_SCHEMA = generateMockElementSchema({
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

        const parsedSchema = parseBaseSchema(MOCK_SCHEMA, elementId, {});

        expect(parsedSchema).toHaveProperty("required", true);
        expect(parsedSchema).toHaveProperty(
            "requiredErrorMsg",
            "This is a required field"
        );
    });

    it("should parse the conditional rendering schema correctly if it is present", () => {
        const MOCK_SCHEMA = generateMockElementSchema({
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

        const parsedSchema = parseBaseSchema(MOCK_SCHEMA, elementId, {});

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
        const MOCK_SCHEMA = generateMockElementSchema({
            id: elementId,
            label: {
                mainLabel,
                subLabel,
            },
            uiType: EElementType.TEXT,
        })[elementId] as TElementSchema;

        const parsedSchema = parseBaseSchema(MOCK_SCHEMA, elementId, {
            [elementId]: prefill,
        });

        expect(parsedSchema).toHaveProperty("prefill", prefill);
    });
});

// =============================================================================
// HELPERS
// =============================================================================
const elementId = "mock123";
const mainLabel = "This is a label";
const subLabel = "This is a sub label";
