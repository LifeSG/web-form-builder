import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "jest-canvas-mock";
import { MainPanel, Modals, Toasts } from "src/components";
import { DisplayProvider, EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper } from "src/util/test-helper";

describe("MainPanel", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should display the empty panel content if there are no elements in the panel", async () => {
        renderComponent();
        const emptyPanelContent = await screen.findByTestId("empty-content");
        expect(emptyPanelContent).toBeInTheDocument();
    });

    it("should display the elements", () => {
        renderComponent({
            builderContext: {
                orderedIdentifiers: MOCK_ORDERED_IDENTIFIER,
                elements: MOCK_ELEMENTS,
            },
        });
        expect(
            screen.getByText((content) => content.includes("mockElement1"))
        ).toBeInTheDocument();
    });

    describe("Modals", () => {
        it("should render the modal when the editor panel is dirty when clicking on the cross button", async () => {
            renderComponent({
                builderContext: {
                    orderedIdentifiers: MOCK_ORDERED_IDENTIFIER,
                    elements: MOCK_ELEMENTS,
                    focusedElement: {
                        element: MOCK_ELEMENTS[0],
                        isDirty: true,
                    },
                },
            });
            const getNewElement = screen.getByText((content) =>
                content.includes("mockElement1")
            );
            fireEvent.click(getNewElement);
            await waitFor(() => {
                const getText = screen.getByText("Discard changes?");
                expect(getText).toBeInTheDocument();
            });
        });

        it("should not render the modal when the editor panel is not dirty when clicking on the cross button", async () => {
            renderComponent({
                builderContext: {
                    orderedIdentifiers: MOCK_ORDERED_IDENTIFIER,
                    elements: MOCK_ELEMENTS,
                    focusedElement: {
                        element: MOCK_ELEMENTS[0],
                        isDirty: false,
                    },
                },
            });
            const getNewElement = screen.getByText((content) =>
                content.includes("mockElement1")
            );
            fireEvent.click(getNewElement);
            await waitFor(() => {
                const getText = screen.queryByText("Discard changes?");
                expect(getText).not.toBeInTheDocument();
            });
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <>
                <DisplayProvider>
                    <Modals />
                    <Toasts />
                    <MainPanel />
                </DisplayProvider>
            </>
        )
    );
};

// =============================================================================
// MOCKS
// =============================================================================
const MOCK_ORDERED_IDENTIFIER = [
    {
        internalId: "mock123",
        parentInternalId: "ParentID1",
    },
    {
        internalId: "mock246",
        parentInternalId: "ParentID2",
    },
];

const MOCK_ELEMENTS = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: false,
        size: "full",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    },
    mock246: {
        internalId: "mock246",
        type: EElementType.EMAIL,
        id: "mockElement1",
        required: false,
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    },
};
