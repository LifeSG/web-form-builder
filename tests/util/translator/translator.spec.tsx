import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { Translator } from "src/translator/translator";

describe("Translator", () => {
    describe("generateSchema", () => {
        it("should generate schema for the email field", () => {
            const generatedSchema =
                Translator.generateSchema(MOCK__EMAIL_ELEMENT);
            expect(generatedSchema).toStrictEqual(MOCK_EMAIL_SCHEMA);
        });

        it("should generate schema for a text based field", () => {
            const generatedSchema = Translator.generateSchema(
                MOCK_TEXT_BASED_ELEMENT
            );
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
        columns: { desktop: 12, tablet: 12, mobile: 4 },
        placeholder: "Enter an email address",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    },
};

const MOCK_EMAIL_SCHEMA = {
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
                                tablet: 12,
                                mobile: 4,
                            },
                            placeholder: "Enter an email address",
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
                    disabled: "invalid-form",
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
        columns: { desktop: 12, tablet: 12, mobile: 4 },
        placeholder: "Enter a text",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    },
};

const MOCK_TEXT_BASED_SCHEMA = {
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
                                tablet: 12,
                                mobile: 4,
                            },
                            placeholder: "Enter a text",
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
                    disabled: "invalid-form",
                },
            },
            uiType: "section",
        },
    },
};
