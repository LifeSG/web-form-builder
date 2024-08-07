import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { BasicDetails } from "src/components/element-editor/basic-details";
import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

describe("BasicDetails", () => {
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

    describe("conditional rendering of element-specific basic details component", () => {
        it("should render the EMAIL basic details component when the element type is EMAIL", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.EMAIL),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.EMAIL,
                },
            });

            const emailBasicDetails = await screen.findByTestId(
                "email-basic-details"
            );
            expect(emailBasicDetails).toBeInTheDocument();
        });

        it("should render the TEXT basic details component when the element type is TEXT", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.TEXT),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.TEXT,
                },
            });

            const textBasicDetails =
                await screen.findByTestId("text-basic-details");
            expect(textBasicDetails).toBeInTheDocument();
        });

        it("should render the LONG TEXT basic details component when the element type is LONG TEXT", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.TEXTAREA),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.TEXTAREA,
                },
            });

            const longTextBasicDetails = await screen.findByTestId(
                "long-text-basic-details"
            );
            expect(longTextBasicDetails).toBeInTheDocument();
        });

        it("should render the NUMERIC basic details component when the element type is NUMERIC", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.NUMERIC),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.NUMERIC,
                },
            });

            const numericBasicDetails = await screen.findByTestId(
                "numeric-basic-details"
            );
            expect(numericBasicDetails).toBeInTheDocument();
        });

        it("should render the CONTACT basic details component when the element type is CONTACT", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.CONTACT),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.CONTACT,
                },
            });

            const contactBasicDetails = await screen.findByTestId(
                "contact-basic-details"
            );
            expect(contactBasicDetails).toBeInTheDocument();
        });

        it("should render the DROPDOWN basic details component when the element type is DROPDOWN", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.DROPDOWN),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.DROPDOWN,
                },
            });

            const dropdownBasicDetails = await screen.findByTestId(
                "dropdown-basic-details"
            );
            expect(dropdownBasicDetails).toBeInTheDocument();
        });
    });

    describe("resetting of form fields when element type changes", () => {
        it("should replace element name, mandatory field's error message, and ID with values that correspond to the new element type", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.EMAIL),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.EMAIL,
                },
                formContext: {
                    defaultValues: MOCK_FOCUSED_ELEMENT(EElementType.EMAIL),
                },
            });

            // Check initial state

            const textBasicDetails = await screen.findByTestId(
                "email-basic-details"
            );
            expect(textBasicDetails).toBeInTheDocument();

            let elementName = screen.getByTestId("label-field");
            let errorMessageField = screen.getByTestId(
                "required-error-message-field"
            );
            let elementId = screen.getByTestId("id-field");

            expect(elementName).toHaveValue("Email address");
            expect(errorMessageField).toHaveValue("This is a required field.");
            expect(elementId).toHaveValue("email-field");

            // Change element type to TEXT

            fireEvent.click(screen.getByTestId("type-field"));

            const textOption = await screen.findByText("Short text");
            expect(textOption).toBeInTheDocument();

            fireEvent.click(textOption);

            // Check that new element type's values are set
            elementName = screen.getByTestId("label-field");
            errorMessageField = screen.getByTestId(
                "required-error-message-field"
            );
            elementId = screen.getByTestId("id-field");

            expect(elementName).toHaveValue("Short text");
            expect(errorMessageField).toHaveValue("This is a required field.");
            expect(elementId).toHaveValue("short-text-field");
        });

        it("should clear all other field values that do not have default values", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.EMAIL),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.EMAIL,
                },
                formContext: {
                    defaultValues: MOCK_FOCUSED_ELEMENT(EElementType.EMAIL),
                },
            });

            let descriptionField = screen.getByTestId("description-field");
            let placeholderField = screen.getByTestId("placeholder-field");
            let preselectedValueField = screen.getByTestId(
                "preselected-value-field"
            );

            fireEvent.change(descriptionField, {
                target: { value: "description" },
            });
            fireEvent.change(placeholderField, {
                target: { value: "placeholder" },
            });
            fireEvent.change(preselectedValueField, {
                target: { value: "preselectedValue" },
            });

            expect(descriptionField).toHaveValue("description");
            expect(placeholderField).toHaveValue("placeholder");
            expect(preselectedValueField).toHaveValue("preselectedValue");

            // Change element type to TEXT
            fireEvent.click(screen.getByTestId("type-field"));

            const textOption = await screen.findByText("Short text");
            expect(textOption).toBeInTheDocument();

            fireEvent.click(textOption);

            // Check that the fields are cleared
            descriptionField = screen.getByTestId("description-field");
            placeholderField = screen.getByTestId("placeholder-field");
            preselectedValueField = screen.getByTestId(
                "preselected-value-field"
            );

            expect(descriptionField).toHaveValue("");
            expect(placeholderField).toHaveValue("");
            expect(preselectedValueField).toHaveValue("");
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <BasicDetails />));
};

// =============================================================================
// MOCKS
// =============================================================================

const MOCK_FOCUSED_ELEMENT = (elementType: EElementType) => {
    const element: TElement = {
        internalId: "mock123",
        type: elementType,
        id: "email-field",
        required: true,
        requiredErrorMsg: "This is a required field.",
        description: "hellooo",
        label: ELEMENT_BUTTON_LABELS[elementType],
        columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
    };
    return element;
};
