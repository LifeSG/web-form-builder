import { EElementType, TElementMap } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import { Translator } from "src/translator";
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
        describe("Email field schema generation", () => {
            it("should generate schema for the email field", () => {
                const MOCK__EMAIL_ELEMENT: TElementMap = generateMockElement({
                    type: EElementType.EMAIL,
                    id: "mockId1",
                    internalId: "mockId1",
                    required: false,
                });
                const MOCK_EMAIL_SCHEMA = generateMockSchema({
                    children: generateMockElementSchema({
                        id: "mockId1",
                        label: "Email address",
                        uiType: EElementType.EMAIL,
                    }),
                });
                const orderedIdentifiers = [
                    { internalId: "mockId1", position: 0 },
                ];

                const generatedSchema = Translator.generateSchema(
                    MOCK__EMAIL_ELEMENT,
                    orderedIdentifiers
                );
                expect(generatedSchema).toStrictEqual(MOCK_EMAIL_SCHEMA);
            });
            it("should generate schema for the email field with validation", () => {
                const MOCK__EMAIL_ELEMENT_WITH_VALIDATION: TElementMap =
                    generateMockElement({
                        type: EElementType.EMAIL,
                        id: "mockId1",
                        internalId: "mockId1",
                        requiredErrorMsg: "Email address is required",
                        validation: [
                            {
                                validationType:
                                    ELEMENT_VALIDATION_TYPES["Text field"][
                                        EElementType.EMAIL
                                    ].validationTypes[0],
                                validationRule: "@gmail.com",
                                validationErrorMessage:
                                    "Enter a email that has a '@gmail.com' domain",
                            },
                        ],
                    });

                const MOCK_EMAIL_SCHEMA_WITH_VALIDATION = generateMockSchema({
                    children: generateMockElementSchema({
                        id: "mockId1",
                        label: "Email address",
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
                const orderedIdentifiers = [
                    { internalId: "mockId1", position: 0 },
                ];
                const generatedSchema = Translator.generateSchema(
                    MOCK__EMAIL_ELEMENT_WITH_VALIDATION,
                    orderedIdentifiers
                );
                expect(generatedSchema).toStrictEqual(
                    MOCK_EMAIL_SCHEMA_WITH_VALIDATION
                );
            });
            it("should generate schema for the email field with conditional rendering", () => {
                const MOCK__EMAIL_ELEMENT_WITH_CONDITIONAL_RENDERING: TElementMap =
                    {
                        ...generateMockElement({
                            type: EElementType.EMAIL,
                            id: "mock123",
                            internalId: "mock123",
                            requiredErrorMsg: "Email address is required",
                            conditionalRendering: [
                                {
                                    fieldKey: "mock456",
                                    comparator: "Equals",
                                    value: "hello",
                                    internalId: "mock456",
                                },
                            ],
                        }),
                        ...generateMockElement({
                            type: EElementType.TEXT,
                            id: "mock456",
                            internalId: "mock456",
                            requiredErrorMsg: "Input is required",
                        }),
                    };

                const MOCK_EMAIL_SCHEMA_WITH_CONDITIONAL_RENDERING =
                    generateMockSchema({
                        children: {
                            ...generateMockElementSchema({
                                id: "mock123",
                                label: "Email address",
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
                                label: "Short text",
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
                const orderedIdentifiers = [
                    { internalId: "mock123", position: 0 },
                    { internalId: "mock456", position: 1 },
                ];
                const generatedSchema = Translator.generateSchema(
                    MOCK__EMAIL_ELEMENT_WITH_CONDITIONAL_RENDERING,
                    orderedIdentifiers
                );
                expect(generatedSchema).toStrictEqual(
                    MOCK_EMAIL_SCHEMA_WITH_CONDITIONAL_RENDERING
                );
            });
            it("should generate schema for the email field with myinfo prefill", () => {
                const MOCK__EMAIL_ELEMENT_WITH_MYINFO_PREFILL: TElementMap =
                    generateMockElement({
                        type: EElementType.EMAIL,
                        id: "mock123",
                        internalId: "mock123",
                        requiredErrorMsg: "Email address is required",
                        prefill: [
                            {
                                prefillMode: "Myinfo",
                                path: "testpath",
                            },
                        ],
                    });

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
                            label: "Email address",
                            uiType: EElementType.EMAIL,
                            validation: [
                                {
                                    required: true,
                                    errorMessage: "Email address is required",
                                },
                            ],
                        }),
                    });
                const orderedIdentifiers = [
                    { internalId: "mock123", position: 0 },
                ];
                const generatedSchema = Translator.generateSchema(
                    MOCK__EMAIL_ELEMENT_WITH_MYINFO_PREFILL,
                    orderedIdentifiers
                );
                expect(generatedSchema).toStrictEqual(
                    MOCK_EMAIL_SCHEMA_WITH_MYINFO_PREFILL
                );
            });
            it("should generate schema for the email field with previous source prefill", () => {
                const MOCK__EMAIL_ELEMENT_WITH_PREVIOUS_SOURCE_PREFILL: TElementMap =
                    generateMockElement({
                        type: EElementType.EMAIL,
                        id: "mock123",
                        internalId: "mock123",
                        requiredErrorMsg: "Email address is required",
                        prefill: [
                            {
                                prefillMode: "Previous source",
                                path: "testpath",
                                actionId: "testaction",
                            },
                        ],
                    });

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
                            id: "mock123",
                            label: "Email address",
                            uiType: EElementType.EMAIL,
                            validation: [
                                {
                                    required: true,
                                    errorMessage: "Email address is required",
                                },
                            ],
                        }),
                    });
                const orderedIdentifiers = [
                    { internalId: "mock123", position: 0 },
                ];

                const generatedSchema = Translator.generateSchema(
                    MOCK__EMAIL_ELEMENT_WITH_PREVIOUS_SOURCE_PREFILL,
                    orderedIdentifiers
                );
                expect(generatedSchema).toStrictEqual(
                    MOCK_EMAIL_SCHEMA_WITH_PREVIOUS_SOURCE_PREFILL
                );
            });
        });

        describe("Text based field schema generation", () => {
            it("should generate schema for a text based field", () => {
                const MOCK_TEXT_BASED_ELEMENT: TElementMap =
                    generateMockElement({
                        type: EElementType.TEXT,
                        id: "mockId1",
                        internalId: "mockId1",
                        requiredErrorMsg: "Input is required",
                    });

                const MOCK_TEXT_BASED_SCHEMA = generateMockSchema({
                    children: generateMockElementSchema({
                        id: "mockId1",
                        label: "Short text",
                        uiType: EElementType.TEXT,
                        validation: [
                            {
                                required: true,
                                errorMessage: "Input is required",
                            },
                        ],
                    }),
                });
                const orderedIdentifiers = [
                    { internalId: "mockId1", position: 0 },
                ];

                const generatedSchema = Translator.generateSchema(
                    MOCK_TEXT_BASED_ELEMENT,
                    orderedIdentifiers
                );
                expect(generatedSchema).toStrictEqual(MOCK_TEXT_BASED_SCHEMA);
            });
        });
    });
});
