import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

    it.each`
        elementType              | testId
        ${EElementType.EMAIL}    | ${"email-basic-details"}
        ${EElementType.TEXT}     | ${"text-basic-details"}
        ${EElementType.TEXTAREA} | ${"long-text-basic-details"}
        ${EElementType.NUMERIC}  | ${"numeric-basic-details"}
        ${EElementType.CONTACT}  | ${"contact-basic-details"}
        ${EElementType.DROPDOWN} | ${"dropdown-basic-details"}
    `(
        "should render the $elementType basic details component",
        async ({ elementType, testId }) => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(elementType),
                        isDirty: false,
                    },
                    selectedElementType: elementType,
                },
            });

            const basicDetails = await screen.findByTestId(testId);
            expect(basicDetails).toBeInTheDocument();
        }
    );

    describe("resetting of form fields when element type changes", () => {
        it("should populate element name, mandatory field's error message, and ID with default values in the initial state", async () => {
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

            const textBasicDetails = await screen.findByTestId(
                "email-basic-details"
            );
            expect(textBasicDetails).toBeInTheDocument();

            const elementName = screen.getByTestId("label-field");
            const errorMessageField = screen.getByTestId(
                "required-error-message-field"
            );
            const elementId = screen.getByTestId("id-field");

            expect(elementName).toHaveValue("Email address");
            expect(errorMessageField).toHaveValue("This is a required field.");
            expect(elementId).toHaveValue("email-field");
        });

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

            // Change element type to TEXT
            fireEvent.click(screen.getByTestId("type-field"));

            const textOption = await screen.findByText("Short text");
            expect(textOption).toBeInTheDocument();

            fireEvent.click(textOption);

            // Check that new element type's values are set
            waitFor(() => {
                const elementName = screen.getByTestId("label-field");
                const errorMessageField = screen.getByTestId(
                    "required-error-message-field"
                );
                const elementId = screen.getByTestId("id-field");

                expect(elementName).toHaveValue("Short text");
                expect(errorMessageField).toHaveValue(
                    "This is a required field."
                );
                expect(elementId).toHaveValue("short-text-field");
            });
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
            waitFor(() => {
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
