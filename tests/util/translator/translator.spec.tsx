import {
    EElementType,
    EValidationType,
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
                const MOCK__ELEMENT = generateMockElement(MOCK_ELEMENT);

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

                const orderedIdentifiers = [{ internalId, position: 0 }];
                const generatedSchema = Translator.generateSchema(
                    MOCK__ELEMENT,
                    orderedIdentifiers
                );

                expect(generatedSchema).toStrictEqual(MOCK_ELEMENT_SCHEMA);
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
        describe("Email field schema translation", () => {
            it("should translate validation from the schema & be generated into new elements", () => {
                const MOCK_EMAIL_SCHEMA_WITH_VALIDATION = generateMockSchema({
                    children: generateMockElementSchema({
                        id: "mockId1",
                        label: {
                            mainLabel: "Email address",
                        },
                        uiType: EElementType.EMAIL,
                        validation: [
                            {
                                required: true,
                                errorMessage: "Email address is required",
                            },
                            {
                                matches: "/^[a-zA-Z0-9._%+-]+@(gmail\\.com)$/",
                                errorMessage:
                                    "Enter a email that has a '@gmail.com' domain",
                            },
                        ],
                    }),
                });
                const generatedSchema = Translator.parseSchema(
                    MOCK_EMAIL_SCHEMA_WITH_VALIDATION as ISchemaProps
                );

                const MOCK__EMAIL_ELEMENT_WITH_VALIDATION: TElementMap =
                    generateMockElement({
                        type: EElementType.EMAIL,
                        label: "Email address",
                        id: "mockId1",
                        internalId: Object.keys(generatedSchema.newElements)[0],
                        requiredErrorMsg: "Email address is required",
                        description: "",
                        validation: [
                            {
                                validationType: EValidationType.EMAIL_DOMAIN,
                                validationRule: "@gmail.com",
                                validationErrorMessage:
                                    "Enter a email that has a '@gmail.com' domain",
                            },
                        ],
                        conditionalRendering: [],
                        prefill: [],
                    });

                expect(generatedSchema.newElements).toEqual(
                    MOCK__EMAIL_ELEMENT_WITH_VALIDATION
                );
            });
            it("should translate conditional rendering from the schema & be generated into new elements", () => {
                const MOCK_EMAIL_SCHEMA_WITH_CONDITIONAL_RENDERING =
                    generateMockSchema({
                        children: {
                            ...generateMockElementSchema({
                                id: "mock123",
                                label: {
                                    mainLabel: "Email address",
                                },
                                uiType: EElementType.EMAIL,
                                validation: [
                                    {
                                        required: true,
                                        errorMessage:
                                            "Email address is required",
                                    },
                                ],
                                showIf: [
                                    {
                                        mock456: [
                                            { filled: true },
                                            {
                                                equals: "hello",
                                            },
                                        ],
                                    },
                                ],
                            }),
                            ...generateMockElementSchema({
                                id: "mock456",
                                label: {
                                    mainLabel: "Short text",
                                },
                                uiType: EElementType.TEXT,
                                validation: [
                                    {
                                        required: true,
                                        errorMessage: "Input is required",
                                    },
                                ],
                            }),
                        },
                    });

                const generatedSchema = Translator.parseSchema(
                    MOCK_EMAIL_SCHEMA_WITH_CONDITIONAL_RENDERING as ISchemaProps
                );

                const MOCK__EMAIL_ELEMENT_WITH_CONDITIONAL_RENDERING: TElementMap =
                    {
                        ...generateMockElement({
                            type: EElementType.EMAIL,
                            label: "Email address",
                            id: "mock123",
                            internalId: Object.keys(
                                generatedSchema.newElements
                            )[0],
                            requiredErrorMsg: "Email address is required",
                            description: "",
                            validation: [],
                            conditionalRendering: [
                                {
                                    fieldKey: "mock456",
                                    comparator: "Equals",
                                    value: "hello",
                                    internalId: Object.keys(
                                        generatedSchema.newElements
                                    )[1],
                                },
                            ],
                            prefill: [],
                        }),
                        ...generateMockElement({
                            type: EElementType.TEXT,
                            label: "Short text",
                            id: "mock456",
                            internalId: Object.keys(
                                generatedSchema.newElements
                            )[1],
                            requiredErrorMsg: "Input is required",
                            description: "",
                            validation: [],
                            conditionalRendering: [],
                            prefill: [],
                        }),
                    };

                expect(generatedSchema.newElements).toEqual(
                    MOCK__EMAIL_ELEMENT_WITH_CONDITIONAL_RENDERING
                );
            });

            it("should translate with myinfo prefill from the schema & be generated into new elements", () => {
                const MOCK_EMAIL_SCHEMA_WITH_MYINFO_PREFILL =
                    generateMockSchema({
                        prefill: {
                            mock123: [
                                {
                                    prefillMode: "Myinfo",
                                    path: "testpath",
                                },
                            ],
                        },
                        children: generateMockElementSchema({
                            id: "mock123",
                            label: {
                                mainLabel: "Email address",
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

                const generatedSchema = Translator.parseSchema(
                    MOCK_EMAIL_SCHEMA_WITH_MYINFO_PREFILL as ISchemaProps
                );

                const MOCK__EMAIL_ELEMENT_WITH_MYINFO_PREFILL: TElementMap =
                    generateMockElement({
                        type: EElementType.EMAIL,
                        id: "mock123",
                        internalId: Object.keys(generatedSchema.newElements)[0],
                        requiredErrorMsg: "Email address is required",
                        description: "",
                        validation: [],
                        prefill: [
                            {
                                prefillMode: "Myinfo",
                                path: "testpath",
                            },
                        ],
                        conditionalRendering: [],
                    });

                expect(generatedSchema.newElements).toEqual(
                    MOCK__EMAIL_ELEMENT_WITH_MYINFO_PREFILL
                );
            });

            it("should translate with previous source prefill from the schema & be generated into new elements", () => {
                const MOCK_EMAIL_SCHEMA_WITH_PREVIOUS_SOURCE_PREFILL =
                    generateMockSchema({
                        prefill: {
                            mock123: [
                                {
                                    prefillMode: "Previous source",
                                    path: "testpath",
                                    actionId: "ui_action_id",
                                },
                            ],
                        },
                        children: generateMockElementSchema({
                            id: "mock123",
                            label: {
                                mainLabel: "Email address",
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

                const generatedSchema = Translator.parseSchema(
                    MOCK_EMAIL_SCHEMA_WITH_PREVIOUS_SOURCE_PREFILL as ISchemaProps
                );

                const MOCK__EMAIL_ELEMENT_WITH_PREVIOUS_SOURCE_PREFILL: TElementMap =
                    generateMockElement({
                        type: EElementType.EMAIL,
                        id: "mock123",
                        internalId: Object.keys(generatedSchema.newElements)[0],
                        requiredErrorMsg: "Email address is required",
                        description: "",
                        validation: [],
                        conditionalRendering: [],
                        prefill: [
                            {
                                prefillMode: "Previous source",
                                path: "testpath",
                                actionId: "ui_action_id",
                            },
                        ],
                    });

                expect(generatedSchema.newElements).toEqual(
                    MOCK__EMAIL_ELEMENT_WITH_PREVIOUS_SOURCE_PREFILL
                );
            });
        });

        describe("Text based field schema translation", () => {
            it("should translate text based fields from the schema to the element", () => {
                const MOCK_TEXT_BASED_SCHEMA = generateMockSchema({
                    children: {
                        ...generateMockElementSchema({
                            id: "mockId1",
                            label: {
                                mainLabel: "Short text",
                            },
                            uiType: EElementType.TEXT,
                            validation: [
                                {
                                    required: true,
                                    errorMessage: "Input is required",
                                },
                            ],
                        }),
                        ...generateMockElementSchema({
                            id: "mock456",
                            label: {
                                mainLabel: "Number",
                            },
                            uiType: EElementType.NUMERIC,
                            validation: [
                                {
                                    required: true,
                                    errorMessage: "Number is required",
                                },
                            ],
                        }),
                    },
                });
                const generatedSchema = Translator.parseSchema(
                    MOCK_TEXT_BASED_SCHEMA as ISchemaProps
                );

                const MOCK_TEXT_BASED_ELEMENT: TElementMap = {
                    ...generateMockElement({
                        type: EElementType.TEXT,
                        label: "Short text",
                        id: "mockId1",
                        internalId: Object.keys(generatedSchema.newElements)[0],
                        required: true,
                        requiredErrorMsg: "Input is required",
                        description: "",
                        validation: [],
                        conditionalRendering: [],
                        prefill: [],
                    }),
                    ...generateMockElement({
                        type: EElementType.NUMERIC,
                        id: "mock456",
                        label: "Number",
                        internalId: Object.keys(generatedSchema.newElements)[1],
                        required: true,
                        requiredErrorMsg: "Number is required",
                        description: "",
                        validation: [],
                        conditionalRendering: [],
                        prefill: [],
                    }),
                };

                expect(generatedSchema.newElements).toEqual(
                    MOCK_TEXT_BASED_ELEMENT
                );
            });
        });
    });
});

// =============================================================================
// HELPERS
// =============================================================================

const label = "Email address";
const id = "mock123";
const requiredErrorMsg = "Email address is required";
const internalId = "mock123";
