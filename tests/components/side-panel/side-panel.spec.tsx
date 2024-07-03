import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "jest-canvas-mock";
import { act } from "react-dom/test-utils";
import { SidePanel } from "src/components";
import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper } from "src/util/test-helper";

describe("SidePanel", () => {
    beforeEach(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
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
                () => new Promise((resolve) => setTimeout(resolve, 10000))
            );

            renderComponent(
                {
                    builderContext: {
                        focusedElement: {
                            element: MOCK_ELEMENT,
                        },
                    },
                },
                mockOnSubmit
            );

            const saveButton = screen.getByTestId("save-changes-button");

            expect(saveButton).not.toBeDisabled();
            expect(saveButton).toHaveTextContent("Saved");

            act(() => {
                fireEvent.click(saveButton);
            });

            await waitFor(() => expect(saveButton).toHaveTextContent("Saving"));

            expect(saveButton).toBeDisabled();

            await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());

            act(() => {
                jest.advanceTimersByTime(10000);
            });

            await waitFor(() => expect(saveButton).toHaveTextContent("Saved"));
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
            overrideOptions,
            <SidePanel onSubmit={onSubmit} />
        )
    );
};

const getToolbar = () => screen.queryByTestId("toolbar");

const getAddElementsPanel = () => screen.getByTestId("add-elements-panel");

const getElementEditor = () => screen.getByTestId("element-editor");

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
