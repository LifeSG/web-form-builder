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
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXT,
        })[ELEMENT_ID] as TElementSchema;

        const parsedSchema = parseBaseSchema(
            mockSchema,
            ELEMENT_ID,
            {},
            undefined
        );

        const expectedParsedSchema = generateMockElement({
            id: ELEMENT_ID,
            label: MAIN_LABEL,
            description: SUB_LABEL,
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
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXT,
            validation: [
                {
                    required: true,
                    errorMessage: "This is a required field",
                },
            ],
        })[ELEMENT_ID] as TElementSchema;

        const parsedSchema = parseBaseSchema(
            mockSchema,
            ELEMENT_ID,
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
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXT,
            showIf: [
                {
                    [ELEMENT_ID]: [
                        {
                            equals: "test",
                        },
                    ],
                },
            ],
        })[ELEMENT_ID] as TElementSchema;

        const parsedSchema = parseBaseSchema(
            mockSchema,
            ELEMENT_ID,
            {},
            undefined
        );

        expect(parsedSchema).toHaveProperty("conditionalRendering", [
            {
                fieldKey: ELEMENT_ID,
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
            id: ELEMENT_ID,
            label: {
                mainLabel: MAIN_LABEL,
                subLabel: SUB_LABEL,
            },
            uiType: EElementType.TEXT,
        })[ELEMENT_ID] as TElementSchema;

        const parsedSchema = parseBaseSchema(
            mockSchema,
            ELEMENT_ID,
            {
                [ELEMENT_ID]: prefill,
            },
            undefined
        );

        expect(parsedSchema).toHaveProperty("prefill", prefill);
    });
});

// =============================================================================
// HELPERS
// =============================================================================
const ELEMENT_ID = "mock123";
const MAIN_LABEL = "This is a label";
const SUB_LABEL = "This is a sub label";
