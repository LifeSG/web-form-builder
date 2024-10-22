import { act, fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { BasicDetails } from "src/components";
import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

jest.mock("src/context-providers/display/modal-hook", () => ({
    useModal: () => ({
        hideModal: mockHideModal,
        showModal: mockShowModal,
    }),
}));

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

            // trigger reset confirmation modal
            const typeField = screen.getByTestId("type-field");
            fireEvent.click(typeField);

            const shortTextOption = await screen.findByText("Short text");
            expect(shortTextOption).toBeInTheDocument();
            fireEvent.click(shortTextOption);

            expect(mockShowModal).toHaveBeenCalled();

            // Trigger the reset action
            act(() => {
                mockShowModal.mock.lastCall[0].onClickActionButton();
            });

            expect(mockHideModal).toHaveBeenCalled();

            // Check if the form fields have been replaced with the new element type's default values
            const elementName = screen.getByTestId("label-field");
            const errorMessageField = screen.getByTestId(
                "required-error-message-field"
            );
            const elementId = screen.getByTestId("id-field");

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

            const descriptionField = screen.getByTestId("description-field");
            const placeholderField = screen.getByTestId("placeholder-field");
            const preselectedValueField = screen.getByTestId(
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

            // trigger reset confirmation modal
            const typeField = screen.getByTestId("type-field");
            fireEvent.click(typeField);

            const shortTextOption = await screen.findByText("Short text");
            expect(shortTextOption).toBeInTheDocument();
            fireEvent.click(shortTextOption);

            expect(mockShowModal).toHaveBeenCalled();

            // Trigger the reset action
            act(() => {
                mockShowModal.mock.lastCall[0].onClickActionButton();
            });

            expect(mockHideModal).toHaveBeenCalled();

            // Wait for the form to reset
            const updatedDescriptionField =
                await screen.findByTestId("description-field");
            const updatedPlaceholderField =
                await screen.findByTestId("placeholder-field");
            const updatedPreselectedValueField = await screen.findByTestId(
                "preselected-value-field"
            );

            expect(updatedDescriptionField).toHaveValue("");
            expect(updatedPlaceholderField).toHaveValue("");
            expect(updatedPreselectedValueField).toHaveValue("");
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

const mockHideModal = jest.fn();
const mockShowModal = jest.fn();

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
