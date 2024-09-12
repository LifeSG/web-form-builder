import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "jest-canvas-mock";
import { SidePanel } from "src/components";
import {
    EElementType,
    TElement,
    TOptionGroupBasedElement,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper } from "src/util/test-helper";

describe("SidePanel", () => {
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

    describe("rendering of the toolbar", () => {
        it("should display the toolbar when there is no focused element", () => {
            renderComponent();
            expect(getToolbar()).toBeInTheDocument();
        });

        it("should not display the toolbar when there is a focused element", () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_ELEMENT,
                    },
                },
            });
            expect(getToolbar()).not.toBeInTheDocument();
        });
    });

    describe("rendering of the panel content", () => {
        it("should display the add elements panel when there is no focused element", () => {
            renderComponent();
            expect(getAddElementsPanel()).toBeInTheDocument();
        });

        it("should display the element editor when there is a focused element", () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_ELEMENT,
                    },
                },
            });
            expect(getElementEditor()).toBeInTheDocument();
        });
    });

    describe("saving of edit element details panel", () => {
        it("should show loading state and disable button when form is saving", async () => {
            const mockOnSubmit = jest.fn(
                () => new Promise((resolve) => setTimeout(resolve))
            );

            renderComponent(
                {
                    builderContext: {
                        focusedElement: {
                            element: MOCK_ELEMENT,
                        },
                        selectedElementType: EElementType.EMAIL,
                        isSubmitting: true,
                    },
                },
                mockOnSubmit
            );

            const saveButton = screen.getByTestId("save-changes-button");

            expect(saveButton).toHaveTextContent("Saving");

            expect(saveButton).toBeDisabled();
        });

        it("should execute the onSubmit function if it is passed in", async () => {
            const mockOnSubmit = jest.fn(
                () => new Promise((resolve) => setTimeout(resolve))
            );

            renderComponent(
                {
                    builderContext: {
                        focusedElement: {
                            element: MOCK_ELEMENT,
                        },
                        selectedElementType: EElementType.EMAIL,
                    },
                },
                mockOnSubmit
            );

            const saveButton = screen.getByTestId("save-changes-button");

            fireEvent.click(saveButton);

            await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
        });

        it("should remove empty options when saving if there are at least 2 valid options", async () => {
            const MOCK_DROPDOWN_ELEMENT: TOptionGroupBasedElement = {
                internalId: "mock123",
                type: EElementType.DROPDOWN,
                id: "mockElement",
                required: false,
                label: ELEMENT_BUTTON_LABELS[EElementType.DROPDOWN],
                columns: { desktop: 12, tablet: 8, mobile: 4 },
                dropdownItems: [
                    { label: "", value: "" },
                    { label: "", value: "" },
                ],
            };

            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_DROPDOWN_ELEMENT,
                    },
                    selectedElementType: EElementType.DROPDOWN,
                },
            });

            const optionLabels = await screen.findAllByTestId("option-label");
            const optionValues = await screen.findAllByTestId("option-value");

            let saveButton = screen.getByTestId("save-changes-button");

            expect(saveButton).toHaveTextContent("Saved");

            expect(optionLabels).toHaveLength(2);

            fireEvent.input(optionLabels[0], {
                target: { value: "New Label" },
            });
            fireEvent.input(optionValues[0], {
                target: { value: "New Value" },
            });
            fireEvent.input(optionLabels[1], {
                target: { value: "New Label" },
            });
            fireEvent.input(optionValues[1], {
                target: { value: "New Value" },
            });

            fireEvent.click(screen.getByText("Add Option"));

            expect(getOptionChildren()).toHaveLength(3);

            fireEvent.click(saveButton);

            await waitFor(() => {
                expect(getOptionChildren()).toHaveLength(2);
            });
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (
    overrideOptions?: TestHelper.RenderOptions,
    onSubmit?: (formData: TElement) => Promise<unknown>
) => {
    return render(
        TestHelper.withProviders(
            {
                ...overrideOptions,
                includeFormProvider: false,
            },
            <SidePanel onSubmit={onSubmit} />
        )
    );
};

const getToolbar = () => screen.queryByTestId("toolbar");

const getAddElementsPanel = () => screen.getByTestId("add-elements-panel");

const getElementEditor = () => screen.getByTestId("element-editor");

const getOptionChildren = () => screen.queryAllByTestId("option-child");

// =============================================================================
// MOCKS
// =============================================================================

const MOCK_ELEMENT: TElement = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    columns: { desktop: 12, tablet: 8, mobile: 4 },
};
