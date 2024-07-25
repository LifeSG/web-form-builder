import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "jest-canvas-mock";
import { Modals } from "src/components";
import { SidePanelHeader } from "src/components/side-panel/side-panel-header";
import {
    DisplayProvider,
    EBuilderMode,
    EElementType,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper } from "src/util/test-helper";

describe("SidePanelHeader", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("getHeaderTitle & conditonal rendering of the cross button", () => {
        it("should run the getHeaderTitle function and display the Add Elements title for the add-elements mode", () => {
            renderComponent();
            expect(getHeaderLabel().textContent).toEqual("Add elements");
        });

        it("should run the getHeaderTitle function and display the Add Pages title for the add-pages mode", () => {
            renderComponent({
                builderContext: {
                    mode: EBuilderMode.EDIT_PAGES,
                },
            });
            expect(getHeaderLabel().textContent).toEqual("Add pages");
        });

        it("should display the edit element header title when there is a focusedElement", () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: mockElement,
                    },
                },
            });
            expect(getHeaderLabel().textContent).toEqual("Edit details");
        });
        it("should display the cross button when there is a focused element", () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: mockElement,
                    },
                },
            });
            expect(getCrossButton()).toBeInTheDocument();
        });

        it("should not display the cross button when there is no focused element", () => {
            renderComponent();
            expect(getCrossButton(true)).not.toBeInTheDocument();
        });
    });

    describe("Modals", () => {
        it("should render the modal when the editor panel is dirty when clicking on the corss button", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: mockElement,
                        isDirty: true,
                    },
                },
            });
            const crossButton = getCrossButton();
            fireEvent.click(crossButton);
            await waitFor(() => {
                const getText = screen.getByText("Discard changes?");
                expect(getText).toBeInTheDocument();
            });
        });

        it("should not render the modal when the editor panel is not dirty when clicking on the cross button", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: mockElement,
                        isDirty: false,
                    },
                },
            });
            const crossButton = getCrossButton();
            fireEvent.click(crossButton);
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

const TestComponent = () => {
    return (
        <DisplayProvider>
            <Modals />
            <SidePanelHeader />
        </DisplayProvider>
    );
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <TestComponent />));
};

const getHeaderLabel = () => screen.getByTestId("header-label");
const getCrossButton = (useQuery = false) =>
    useQuery
        ? screen.queryByTestId("cross-button")
        : screen.getByTestId("cross-button");

// =============================================================================
// MOCKS
// =============================================================================
const mockElement = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
};
