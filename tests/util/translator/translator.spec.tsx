import {
    EElementType,
    IEmailField,
    TElement,
    TElementMap,
} from "src/context-providers";
import { ISchemaProps, Translator } from "src/translator";
import {
    generateMockElement,
    generateMockElementSchema,
    generateMockSchema,
} from "./helper";

describe("Translator", () => {
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
    describe("generateSchema", () => {
        it.each(Object.values(EElementType))(
            "should generate schema for %s field",
            (elementType) => {
                const label = "mockLabel";
                const id = "mockId";
                const internalId = "mockInternalId";

                const MOCK_ELEMENT: TElement = {
                    label,
                    id,
                    internalId,
                    type: elementType,
                    required: false,
                    columns: { desktop: 12, tablet: 8, mobile: 4 },
                    validation: [],
                    ...(elementType === EElementType.DROPDOWN && {
                        dropdownItems: [],
                    }),
                };

                const mockElement = generateMockElement(MOCK_ELEMENT);

                const orderedIdentifiers = [{ internalId, position: 0 }];
                const generatedSchema = Translator.generateSchema(
                    mockElement,
                    orderedIdentifiers
                );

                const generatedElement =
                    generatedSchema.schema.sections.section.children.grid[
                        "children"
                    ][id];

                expect(generatedElement).toHaveProperty("uiType", elementType);
            }
        );

        it("should generate schema for the email field with myinfo prefill", () => {
            const MOCK_ELEMENT: IEmailField = {
                type: EElementType.EMAIL,
                label,
                id,
                internalId,
                required: true,
                requiredErrorMsg,
                columns: { desktop: 12, tablet: 8, mobile: 4 },
                validation: [],
                prefill: [
                    {
                        prefillMode: "Myinfo",
                        path: "testpath",
                    },
                ],
            };

            const MOCK__EMAIL_ELEMENT_WITH_MYINFO_PREFILL: TElementMap =
                generateMockElement(MOCK_ELEMENT);

            const MOCK_EMAIL_SCHEMA_WITH_MYINFO_PREFILL = generateMockSchema({
                prefill: {
                    mock123: [
                        {
                            prefillMode: "Myinfo",
                            path: "testpath",
                        },
                    ],
                },
                children: generateMockElementSchema({
                    id,
                    label: {
                        mainLabel: label,
                    },
                    uiType: EElementType.EMAIL,
                    validation: [
                        {
                            required: true,
                            errorMessage: "Email address is required",
                        },
                    ],
                }),
            });
            const orderedIdentifiers = [{ internalId, position: 0 }];
            const generatedSchema = Translator.generateSchema(
                MOCK__EMAIL_ELEMENT_WITH_MYINFO_PREFILL,
                orderedIdentifiers
            );
            expect(generatedSchema).toStrictEqual(
                MOCK_EMAIL_SCHEMA_WITH_MYINFO_PREFILL
            );
        });
        it("should generate schema with previous source prefill", () => {
            const MOCK_ELEMENT: IEmailField = {
                type: EElementType.EMAIL,
                label,
                id,
                internalId,
                required: true,
                requiredErrorMsg,
                columns: { desktop: 12, tablet: 8, mobile: 4 },
                validation: [],
                prefill: [
                    {
                        prefillMode: "Previous source",
                        path: "testpath",
                        actionId: "testaction",
                    },
                ],
            };

            const MOCK__EMAIL_ELEMENT_WITH_PREVIOUS_SOURCE_PREFILL: TElementMap =
                generateMockElement(MOCK_ELEMENT);

            const MOCK_EMAIL_SCHEMA_WITH_PREVIOUS_SOURCE_PREFILL =
                generateMockSchema({
                    prefill: {
                        mock123: [
                            {
                                prefillMode: "Previous source",
                                actionId: "testaction",
                                path: "testpath",
                            },
                        ],
                    },
                    children: generateMockElementSchema({
                        id,
                        label: {
                            mainLabel: label,
                        },
                        uiType: EElementType.EMAIL,
                        validation: [
                            {
                                required: true,
                                errorMessage: requiredErrorMsg,
                            },
                        ],
                    }),
                });
            const orderedIdentifiers = [{ internalId, position: 0 }];

            const generatedSchema = Translator.generateSchema(
                MOCK__EMAIL_ELEMENT_WITH_PREVIOUS_SOURCE_PREFILL,
                orderedIdentifiers
            );
            expect(generatedSchema).toStrictEqual(
                MOCK_EMAIL_SCHEMA_WITH_PREVIOUS_SOURCE_PREFILL
            );
        });

        it("should generate schema with default values", () => {
            const defaultValue = "testValue";
            const MOCK_ELEMENT: IEmailField = {
                type: EElementType.EMAIL,
                label,
                id,
                internalId,
                required: true,
                requiredErrorMsg,
                columns: { desktop: 12, tablet: 8, mobile: 4 },
                validation: [],
                preselectedValue: defaultValue,
            };

            const MOCK__EMAIL_ELEMENT_WITH_DEFAULT_VALUES: TElementMap =
                generateMockElement(MOCK_ELEMENT);

            const MOCK_EMAIL_SCHEMA_WITH_DEFAULT_VALUES = generateMockSchema({
                defaultValues: {
                    [id]: defaultValue,
                },
                children: generateMockElementSchema({
                    id,
                    label: {
                        mainLabel: label,
                    },
                    uiType: EElementType.EMAIL,
                    validation: [
                        {
                            required: true,
                            errorMessage: requiredErrorMsg,
                        },
                    ],
                }),
            });
            const orderedIdentifiers = [{ internalId, position: 0 }];

            const generatedSchema = Translator.generateSchema(
                MOCK__EMAIL_ELEMENT_WITH_DEFAULT_VALUES,
                orderedIdentifiers
            );
            expect(generatedSchema).toStrictEqual(
                MOCK_EMAIL_SCHEMA_WITH_DEFAULT_VALUES
            );
        });
    });

    describe("parseSchema", () => {
        it.each(Object.values(EElementType))(
            "should parse schema for %s field",
            (elementType) => {
                const MOCK_ELEMENT_SCHEMA = generateMockSchema({
                    children: generateMockElementSchema({
                        id,
                        label: {
                            mainLabel: label,
                        },
                        uiType: elementType,
                        ...(elementType === EElementType.DROPDOWN && {
                            dropdownItems: [],
                        }),
                    }),
                });

                const parsedSchema = Translator.parseSchema(
                    MOCK_ELEMENT_SCHEMA as ISchemaProps
                );

                const parsedElementId = Object.keys(
                    parsedSchema.newElements
                )[0];

                expect(
                    parsedSchema.newElements[parsedElementId]
                ).toHaveProperty("type", elementType);
            }
        );

        it("should remove the conditional rendering rule if the element with the corresponding field key does not exist", () => {
            const MOCK_ELEMENT_SCHEMA = generateMockSchema({
                children: generateMockElementSchema({
                    id,
                    label: {
                        mainLabel: label,
                    },
                    uiType: EElementType.TEXT,
                    showIf: [
                        {
                            ["nonExistentFieldKey"]: [
                                {
                                    equals: "test",
                                },
                            ],
                        },
                    ],
                }),
            });

            const parsedSchema = Translator.parseSchema(
                MOCK_ELEMENT_SCHEMA as ISchemaProps
            );

            const parsedElementId = Object.keys(parsedSchema.newElements)[0];

            expect(parsedSchema.newElements[parsedElementId]).toHaveProperty(
                "conditionalRendering",
                []
            );
        });
    });

    it("should parse schema with defaultValues correctly", () => {
        const defaultValue = "testDefaultValue";
        const MOCK_ELEMENT_SCHEMA = generateMockSchema({
            defaultValues: {
                [id]: defaultValue,
            },
            children: generateMockElementSchema({
                id,
                label: {
                    mainLabel: label,
                },
                uiType: EElementType.TEXT,
            }),
        });

        const parsedSchema = Translator.parseSchema(
            MOCK_ELEMENT_SCHEMA as ISchemaProps
        );

        const parsedElementId = Object.keys(parsedSchema.newElements)[0];

        expect(parsedSchema.newElements[parsedElementId]).toHaveProperty(
            "preselectedValue",
            defaultValue
        );
    });
});

// =============================================================================
// HELPERS
// =============================================================================

const label = "Email address";
const id = "mock123";
const requiredErrorMsg = "Email address is required";
const internalId = "mock123";
