import { EElementType, TElementMap } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS, ELEMENT_VALIDATION_TYPES } from "src/data";
import { Translator } from "src/translator";

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
        describe('Email field schema generation"', () => {
            it('should generate schema for the email field"', () => {
                const generatedSchema =
                    Translator.generateSchema(MOCK__EMAIL_ELEMENT);
                expect(generatedSchema).toStrictEqual(MOCK_EMAIL_SCHEMA);
            });
            it('should generate schema for the email field with validation"', () => {
                const generatedSchema = Translator.generateSchema(
                    MOCK__EMAIL_ELEMENT_WITH_VALIDATION
                );
                expect(generatedSchema).toStrictEqual(
                    MOCK_EMAIL_SCHEMA_WITH_VALIDATION
                );
            });
            it('should generate schema for the email field with conditional rendering"', () => {
                const generatedSchema = Translator.generateSchema(
                    MOCK__EMAIL_ELEMENT_WITH_CONDITIONAL_RENDERING
                );
                expect(generatedSchema).toStrictEqual(
                    MOCK_EMAIL_SCHEMA_WITH_CONDITIONAL_RENDERING
                );
            });

            it("should generate schema for the email field with myinfo prefill", () => {
                const generatedSchema = Translator.generateSchema(
                    MOCK__EMAIL_ELEMENT_WITH_MYINFO_PREFILL
                );
                expect(generatedSchema).toStrictEqual(
                    MOCK_EMAIL_SCHEMA_WITH_MYINFO_PREFILL
                );
            });

            it("should generate schema for the email field with previous source prefill", () => {
                const generatedSchema = Translator.generateSchema(
                    MOCK__EMAIL_ELEMENT_WITH_PREVIOUS_SOURCE_PREFILL
                );
                expect(generatedSchema).toStrictEqual(
                    MOCK_EMAIL_SCHEMA_WITH_PREVIOUS_SOURCE_PREFILL
                );
            });
        });

        describe("Text based field schema generation", () => {
            it('should generate schema for a text based field"', () => {
                const generatedSchema = Translator.generateSchema(
                    MOCK_TEXT_BASED_ELEMENT
                );
                expect(generatedSchema).toStrictEqual(MOCK_TEXT_BASED_SCHEMA);
            });
        });
    });
});

// =============================================================================
// MOCKS
// =============================================================================

const MOCK__EMAIL_ELEMENT: TElementMap = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: true,
        requiredErrorMsg: "Email address is required",
        columns: {
            desktop: 12,
            tablet: 8,
            mobile: 4,
        },
        placeholder: "",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    },
};

const MOCK__EMAIL_ELEMENT_WITH_VALIDATION: TElementMap = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: true,
        requiredErrorMsg: "Email address is required",
        columns: {
            desktop: 12,
            tablet: 8,
            mobile: 4,
        },
        placeholder: "",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
        validation: [
            {
                validationType:
                    ELEMENT_VALIDATION_TYPES["Text field"][EElementType.EMAIL]
                        .validationTypes[0],
                validationRule: "@gmail.com",
                validationErrorMessage:
                    "Enter a email that has a '@gmail.com' domain",
            },
        ],
    },
};

const MOCK_EMAIL_SCHEMA_WITH_VALIDATION = {
    prefill: {},
    schema: {
        sections: {
            section: {
                children: {
                    grid: {
                        children: {
                            ["mockElement"]: {
                                label: "Email address",
                                uiType: "email-field",
                                columns: {
                                    desktop: 12,
                                    tablet: 8,
                                    mobile: 4,
                                },
                                placeholder: "",
                                validation: [
                                    {
                                        required: true,
                                        errorMessage:
                                            "Email address is required",
                                    },
                                    {
                                        matches:
                                            "/^[a-zA-Z0-9._%+-]+@(gmail\\.com)$/",
                                        errorMessage:
                                            "Enter a email that has a '@gmail.com' domain",
                                    },
                                ],
                            },
                        },
                        uiType: "grid",
                    },
                    "submit-button": {
                        disabled: "invalid-form",
                        label: "Submit",
                        uiType: "submit",
                    },
                },
                uiType: "section",
            },
        },
    },
};

const MOCK__EMAIL_ELEMENT_WITH_CONDITIONAL_RENDERING: TElementMap = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: true,
        requiredErrorMsg: "Email address is required",
        columns: {
            desktop: 12,
            tablet: 8,
            mobile: 4,
        },
        placeholder: "",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
        validation: [],
        conditionalRendering: [
            {
                fieldKey: "mockElement1",
                comparator: "Equals",
                value: "hello",
                internalId: "mock456",
            },
        ],
    },
    mock456: {
        internalId: "mock456",
        type: EElementType.TEXT,
        id: "mockElement1",
        required: true,
        requiredErrorMsg: "Input is required",
        columns: {
            desktop: 12,
            tablet: 8,
            mobile: 4,
        },
        placeholder: "",
        label: ELEMENT_BUTTON_LABELS[EElementType.TEXT],
    },
};

const MOCK_EMAIL_SCHEMA_WITH_CONDITIONAL_RENDERING = {
    prefill: {},
    schema: {
        sections: {
            section: {
                children: {
                    grid: {
                        children: {
                            ["mockElement"]: {
                                label: "Email address",
                                uiType: "email-field",
                                columns: {
                                    desktop: 12,
                                    tablet: 8,
                                    mobile: 4,
                                },
                                placeholder: "",
                                validation: [
                                    {
                                        required: true,
                                        errorMessage:
                                            "Email address is required",
                                    },
                                ],
                                showIf: [
                                    {
                                        ["mockElement1"]: [
                                            {
                                                filled: true,
                                            },
                                            {
                                                equals: "hello",
                                            },
                                        ],
                                    },
                                ],
                            },
                            ["mockElement1"]: {
                                label: "Short text",
                                uiType: "text-field",
                                columns: {
                                    desktop: 12,
                                    tablet: 8,
                                    mobile: 4,
                                },
                                placeholder: "",
                                validation: [
                                    {
                                        required: true,
                                        errorMessage: "Input is required",
                                    },
                                ],
                            },
                        },
                        uiType: "grid",
                    },
                    "submit-button": {
                        disabled: "invalid-form",
                        label: "Submit",
                        uiType: "submit",
                    },
                },
                uiType: "section",
            },
        },
    },
};

const MOCK__EMAIL_ELEMENT_WITH_MYINFO_PREFILL: TElementMap = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: true,
        requiredErrorMsg: "Email address is required",
        columns: { desktop: 12, tablet: 8, mobile: 4 },
        placeholder: "",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
        prefill: [
            {
                prefillMode: "Myinfo",
                path: "testpath",
            },
        ],
    },
};

const MOCK__EMAIL_ELEMENT_WITH_PREVIOUS_SOURCE_PREFILL: TElementMap = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: true,
        requiredErrorMsg: "Email address is required",
        columns: { desktop: 12, tablet: 8, mobile: 4 },
        placeholder: "",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
        prefill: [
            {
                prefillMode: "Previous source",
                actionId: "testaction",
                path: "testpath",
            },
        ],
    },
};

const MOCK_EMAIL_SCHEMA_WITH_MYINFO_PREFILL = {
    schema: {
        sections: {
            section: {
                children: {
                    grid: {
                        children: {
                            mockElement: {
                                label: "Email address",
                                uiType: "email-field",
                                columns: {
                                    desktop: 12,
                                    tablet: 8,
                                    mobile: 4,
                                },
                                placeholder: "",
                                validation: [
                                    {
                                        required: true,
                                        errorMessage:
                                            "Email address is required",
                                    },
                                ],
                            },
                        },
                        uiType: "grid",
                    },
                    "submit-button": {
                        disabled: "invalid-form",
                        label: "Submit",
                        uiType: "submit",
                    },
                },
                uiType: "section",
            },
        },
    },
    prefill: {
        mockElement: [
            {
                prefillMode: "Myinfo",
                path: "testpath",
            },
        ],
    },
};

const MOCK_EMAIL_SCHEMA_WITH_PREVIOUS_SOURCE_PREFILL = {
    schema: {
        sections: {
            section: {
                children: {
                    grid: {
                        children: {
                            mockElement: {
                                label: "Email address",
                                uiType: "email-field",
                                columns: {
                                    desktop: 12,
                                    tablet: 8,
                                    mobile: 4,
                                },
                                placeholder: "",
                                validation: [
                                    {
                                        required: true,
                                        errorMessage:
                                            "Email address is required",
                                    },
                                ],
                            },
                        },
                        uiType: "grid",
                    },
                    "submit-button": {
                        disabled: "invalid-form",
                        label: "Submit",
                        uiType: "submit",
                    },
                },
                uiType: "section",
            },
        },
    },
    prefill: {
        mockElement: [
            {
                prefillMode: "Previous source",
                actionId: "testaction",
                path: "testpath",
            },
        ],
    },
};

const MOCK_EMAIL_SCHEMA = {
    prefill: {},
    schema: {
        sections: {
            section: {
                children: {
                    grid: {
                        children: {
                            ["mockElement"]: {
                                label: "Email address",
                                uiType: "email-field",
                                columns: {
                                    desktop: 12,
                                    tablet: 8,
                                    mobile: 4,
                                },
                                placeholder: "",
                                validation: [
                                    {
                                        required: true,
                                        errorMessage:
                                            "Email address is required",
                                    },
                                ],
                            },
                        },
                        uiType: "grid",
                    },
                    "submit-button": {
                        disabled: "invalid-form",
                        label: "Submit",
                        uiType: "submit",
                    },
                },
                uiType: "section",
            },
        },
    },
};

const MOCK_TEXT_BASED_ELEMENT: TElementMap = {
    mock456: {
        internalId: "mock456",
        type: EElementType.TEXT,
        id: "mockElement",
        required: true,
        requiredErrorMsg: "Input is required",
        columns: { desktop: 12, tablet: 8, mobile: 4 },
        placeholder: "",
        label: ELEMENT_BUTTON_LABELS[EElementType.TEXT],
    },
};

const MOCK_TEXT_BASED_SCHEMA = {
    prefill: {},
    schema: {
        sections: {
            section: {
                children: {
                    grid: {
                        children: {
                            ["mockElement"]: {
                                label: "Short text",
                                uiType: "text-field",
                                columns: {
                                    desktop: 12,
                                    tablet: 8,
                                    mobile: 4,
                                },
                                placeholder: "",
                                validation: [
                                    {
                                        required: true,
                                        errorMessage: "Input is required",
                                    },
                                ],
                            },
                        },
                        uiType: "grid",
                    },
                    "submit-button": {
                        disabled: "invalid-form",
                        label: "Submit",
                        uiType: "submit",
                    },
                },
                uiType: "section",
            },
        },
    },
};
