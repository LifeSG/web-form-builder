import {
    EElementType,
    EValidationRuleFEEContact,
    EValidationType,
    IEmailFieldAttributes,
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
                const validation =
                    elementType === EElementType.CONTACT
                        ? [
                              {
                                  validationType:
                                      EValidationType.CONTACT_NUMBER,
                                  validationRule:
                                      EValidationRuleFEEContact.DEFAULT,
                                  validationErrorMessage:
                                      "Incorrect contact number",
                              },
                          ]
                        : [];

                const mockElementAttributes: TElement = {
                    label: LABEL,
                    id: ID,
                    internalId: INTERNAL_ID,
                    type: elementType,
                    required: false,
                    columns: { desktop: 12, tablet: 8, mobile: 4 },
                    validation,
                    ...(elementType === EElementType.DROPDOWN && {
                        dropdownItems: [],
                    }),
                    ...(elementType === EElementType.RADIO && {
                        radioItems: [],
                    }),
                };

                const mockElement = generateMockElement(mockElementAttributes);

                const orderedIdentifiers = [
                    { internalId: INTERNAL_ID, position: 0 },
                ];
                const generatedSchema = Translator.generateSchema(
                    mockElement,
                    orderedIdentifiers
                );

                const generatedElement =
                    generatedSchema.schema.sections.section.children.grid[
                        "children"
                    ][ID];

                expect(generatedElement).toHaveProperty("uiType", elementType);
            }
        );

        it("should generate schema for the email field with myinfo prefill", () => {
            const mockElementAttributes: IEmailFieldAttributes = {
                type: EElementType.EMAIL,
                label: LABEL,
                id: ID,
                internalId: INTERNAL_ID,
                required: true,
                requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
                columns: { desktop: 12, tablet: 8, mobile: 4 },
                validation: [],
                prefill: [
                    {
                        prefillMode: "Myinfo",
                        path: "testpath",
                    },
                ],
            };

            const mockElement: TElementMap = generateMockElement(
                mockElementAttributes
            );

            const mockSchema = generateMockSchema({
                prefill: {
                    [ID]: [
                        {
                            prefillMode: "Myinfo",
                            path: "testpath",
                        },
                    ],
                },
                children: generateMockElementSchema({
                    id: ID,
                    label: {
                        mainLabel: LABEL,
                    },
                    uiType: EElementType.EMAIL,
                    validation: [
                        {
                            required: true,
                            errorMessage: REQUIRED_ERROR_MESSAGE,
                        },
                    ],
                }),
            });
            const orderedIdentifiers = [
                { internalId: INTERNAL_ID, position: 0 },
            ];
            const generatedSchema = Translator.generateSchema(
                mockElement,
                orderedIdentifiers
            );
            expect(generatedSchema).toStrictEqual(mockSchema);
        });
        it("should generate schema with previous source prefill", () => {
            const mockElementAttributes: IEmailFieldAttributes = {
                type: EElementType.EMAIL,
                label: LABEL,
                id: ID,
                internalId: INTERNAL_ID,
                required: true,
                requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
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

            const mockElement: TElementMap = generateMockElement(
                mockElementAttributes
            );

            const mockSchema = generateMockSchema({
                prefill: {
                    [ID]: [
                        {
                            prefillMode: "Previous source",
                            actionId: "testaction",
                            path: "testpath",
                        },
                    ],
                },
                children: generateMockElementSchema({
                    id: ID,
                    label: {
                        mainLabel: LABEL,
                    },
                    uiType: EElementType.EMAIL,
                    validation: [
                        {
                            required: true,
                            errorMessage: REQUIRED_ERROR_MESSAGE,
                        },
                    ],
                }),
            });
            const orderedIdentifiers = [
                { internalId: INTERNAL_ID, position: 0 },
            ];

            const generatedSchema = Translator.generateSchema(
                mockElement,
                orderedIdentifiers
            );
            expect(generatedSchema).toStrictEqual(mockSchema);
        });

        it("should generate schema with default values", () => {
            const defaultValue = "testValue";
            const mockElementAttributes: IEmailFieldAttributes = {
                type: EElementType.EMAIL,
                label: LABEL,
                id: ID,
                internalId: INTERNAL_ID,
                required: true,
                requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
                columns: { desktop: 12, tablet: 8, mobile: 4 },
                validation: [],
                preselectedValue: defaultValue,
            };

            const mockElement: TElementMap = generateMockElement(
                mockElementAttributes
            );

            const mockSchema = generateMockSchema({
                defaultValues: {
                    [ID]: defaultValue,
                },
                children: generateMockElementSchema({
                    id: ID,
                    label: {
                        mainLabel: LABEL,
                    },
                    uiType: EElementType.EMAIL,
                    validation: [
                        {
                            required: true,
                            errorMessage: REQUIRED_ERROR_MESSAGE,
                        },
                    ],
                }),
            });
            const orderedIdentifiers = [
                { internalId: INTERNAL_ID, position: 0 },
            ];

            const generatedSchema = Translator.generateSchema(
                mockElement,
                orderedIdentifiers
            );
            expect(generatedSchema).toStrictEqual(mockSchema);
        });

        it("should generate schema without prefill if shouldShowPrefill in options is false", () => {
            const mockElementAttributes: IEmailFieldAttributes = {
                type: EElementType.EMAIL,
                label: LABEL,
                id: ID,
                internalId: INTERNAL_ID,
                required: true,
                requiredErrorMsg: REQUIRED_ERROR_MESSAGE,
                columns: { desktop: 12, tablet: 8, mobile: 4 },
                validation: [],
                prefill: [
                    {
                        prefillMode: "Myinfo",
                        path: "testpath",
                    },
                ],
            };

            const mockElement: TElementMap = generateMockElement(
                mockElementAttributes
            );

            const mockSchema = generateMockSchema({
                shouldShowPrefill: false,
                children: generateMockElementSchema({
                    id: ID,
                    label: {
                        mainLabel: LABEL,
                    },
                    uiType: EElementType.EMAIL,
                    validation: [
                        {
                            required: true,
                            errorMessage: REQUIRED_ERROR_MESSAGE,
                        },
                    ],
                }),
            });

            const orderedIdentifiers = [
                { internalId: INTERNAL_ID, position: 0 },
            ];

            const generatedSchema = Translator.generateSchema(
                mockElement,
                orderedIdentifiers,
                {
                    shouldShowPrefill: false,
                }
            );

            expect(generatedSchema).toStrictEqual(mockSchema);
        });
    });

    describe("parseSchema", () => {
        it.each(Object.values(EElementType))(
            "should parse schema for %s field",
            (elementType) => {
                const mockSchema = generateMockSchema({
                    children: generateMockElementSchema({
                        id: ID,
                        label: {
                            mainLabel: LABEL,
                        },
                        uiType: elementType,
                        ...(elementType === EElementType.DROPDOWN && {
                            dropdownItems: [
                                {
                                    label: "test",
                                    value: "test",
                                },
                                {
                                    label: "test",
                                    value: "test",
                                },
                            ],
                        }),
                        ...(elementType === EElementType.RADIO && {
                            radioItems: [
                                {
                                    label: "test",
                                    value: "test",
                                },
                                {
                                    label: "test",
                                    value: "test",
                                },
                            ],
                        }),
                        ...(elementType === EElementType.CONTACT && {
                            validation: [
                                {
                                    contactNumber: {
                                        internationalNumber: true,
                                    },
                                    errorMessage: "Invalid contact number.",
                                },
                            ],
                        }),
                    }),
                });

                const parsedSchema = Translator.parseSchema(
                    mockSchema as ISchemaProps
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
            const mockSchema = generateMockSchema({
                children: generateMockElementSchema({
                    id: ID,
                    label: {
                        mainLabel: LABEL,
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
                mockSchema as ISchemaProps
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
        const mockSchema = generateMockSchema({
            defaultValues: {
                [ID]: defaultValue,
            },
            children: generateMockElementSchema({
                id: ID,
                label: {
                    mainLabel: LABEL,
                },
                uiType: EElementType.TEXT,
            }),
        });

        const parsedSchema = Translator.parseSchema(mockSchema as ISchemaProps);

        const parsedElementId = Object.keys(parsedSchema.newElements)[0];

        expect(parsedSchema.newElements[parsedElementId]).toHaveProperty(
            "preselectedValue",
            defaultValue
        );
    });

    it("should parse schema with prefill correctly", () => {
        const mockSchema = generateMockSchema({
            prefill: {
                [ID]: [
                    {
                        prefillMode: "Myinfo",
                        path: "testpath",
                    },
                ],
            },
            children: generateMockElementSchema({
                id: ID,
                label: {
                    mainLabel: LABEL,
                },
                uiType: EElementType.TEXT,
            }),
        });

        const parsedSchema = Translator.parseSchema(mockSchema as ISchemaProps);

        const parsedElementId = Object.keys(parsedSchema.newElements)[0];

        expect(parsedSchema.newElements[parsedElementId]).toHaveProperty(
            "prefill",
            [
                {
                    path: "testpath",
                    prefillMode: "Myinfo",
                },
            ]
        );
    });

    it("should parse schema without prefill if shouldShowPrefill in options is false", () => {
        const mockSchema = generateMockSchema({
            prefill: {
                [ID]: [
                    {
                        prefillMode: "Myinfo",
                        path: "testpath",
                    },
                ],
            },
            children: generateMockElementSchema({
                id: ID,
                label: {
                    mainLabel: LABEL,
                },
                uiType: EElementType.TEXT,
            }),
        });

        const parsedSchema = Translator.parseSchema(
            mockSchema as ISchemaProps,
            {
                shouldShowPrefill: false,
            }
        );

        const parsedElementId = Object.keys(parsedSchema.newElements)[0];

        expect(parsedSchema.newElements[parsedElementId]).toHaveProperty(
            "prefill",
            []
        );
    });
});

// =============================================================================
// HELPERS
// =============================================================================

const LABEL = "mockLabel";
const ID = "mockId";
const REQUIRED_ERROR_MESSAGE = "Field is required";
const INTERNAL_ID = "mockInternalId";
