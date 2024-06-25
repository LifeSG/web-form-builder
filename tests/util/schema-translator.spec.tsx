import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { generateSchema } from "src/util/schema-translator";

describe("SchemaTranslator", () => {
    describe("generateSchema", () => {
        it('should generate schema for the email field"', () => {
            const generatedSchema = generateSchema(MOCK__EMAIL_ELEMENT);
            expect(generatedSchema).toStrictEqual(MOCK_EMAIL_SCHEMA);
        });

        it('should generate schema for a text based field"', () => {
            const generatedSchema = generateSchema(MOCK_TEXT_BASED_ELEMENT);
            expect(generatedSchema).toStrictEqual(MOCK_TEXT_BASED_SCHEMA);
        });
    });
});

// =============================================================================
// MOCKS
// =============================================================================

const MOCK__EMAIL_ELEMENT = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: true,
        requiredErrorMsg: "Email address is required",
        columns: 12,
        placeholder: "",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    },
};

const MOCK_EMAIL_SCHEMA = {
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
                            },
                            placeholder: "",
                            validation: [
                                {
                                    required: true,
                                    errorMessage: "Email address is required",
                                },
                            ],
                        },
                    },
                    uiType: "grid",
                },
                "submit-button": {
                    label: "Submit",
                    uiType: "submit",
                },
            },
            uiType: "section",
        },
    },
};

const MOCK_TEXT_BASED_ELEMENT = {
    mock456: {
        internalId: "mock456",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: true,
        requiredErrorMsg: "Input is required",
        columns: 12,
        placeholder: "",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    },
};

const MOCK_TEXT_BASED_SCHEMA = {
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
                    label: "Submit",
                    uiType: "submit",
                },
            },
            uiType: "section",
        },
    },
};
