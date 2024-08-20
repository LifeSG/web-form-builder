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

                const mockElementAttributes: TElement = {
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

                const mockElement = generateMockElement(mockElementAttributes);

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
            const mockElementAttributes: IEmailField = {
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

            const mockElement: TElementMap = generateMockElement(
                mockElementAttributes
            );

            const mockSchema = generateMockSchema({
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
                mockElement,
                orderedIdentifiers
            );
            expect(generatedSchema).toStrictEqual(mockSchema);
        });
        it("should generate schema with previous source prefill", () => {
            const mockElementAttributes: IEmailField = {
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

            const mockElement: TElementMap = generateMockElement(
                mockElementAttributes
            );

            const mockSchema = generateMockSchema({
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
                mockElement,
                orderedIdentifiers
            );
            expect(generatedSchema).toStrictEqual(mockSchema);
        });

        it("should generate schema with default values", () => {
            const defaultValue = "testValue";
            const mockElementAttributes: IEmailField = {
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

            const mockElement: TElementMap = generateMockElement(
                mockElementAttributes
            );

            const mockSchema = generateMockSchema({
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
                mockElement,
                orderedIdentifiers
            );
            expect(generatedSchema).toStrictEqual(mockSchema);
        });
    });

    describe("parseSchema", () => {
        it.each(Object.values(EElementType))(
            "should parse schema for %s field",
            (elementType) => {
                const label = "mockLabel";
                const id = "mockId";

                const mockSchema = generateMockSchema({
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
                mockSchema as ISchemaProps
            );

            const parsedElementId = Object.keys(parsedSchema.newElements)[0];

            expect(parsedSchema.newElements[parsedElementId]).toHaveProperty(
                "conditionalRendering",
                []
            );
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
