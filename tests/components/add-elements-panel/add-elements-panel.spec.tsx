import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "jest-canvas-mock";
import { AddElementsPanel } from "src/components/side-panel/add-elements-panel";
import { EElementType } from "src/context-providers";
import {
    ELEMENTS_CATEGORIES,
    ELEMENT_BUTTON_LABELS,
} from "src/data/elements-data"; // Ensure this includes categoryTitle and elementTypes
import { TestHelper } from "src/util/test-helper";

// =============================================================================
// MOCKS
// =============================================================================
const mockAddElement = jest.fn();
jest.mock("src/context-providers/builder/hook.ts", () => {
    const actual = jest.requireActual("src/context-providers/builder/hook.ts");
    return {
        useBuilder: () => ({
            ...actual.useBuilder(),
            addElement: mockAddElement,
        }),
    };
});

describe("AddElementsPanel", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("addElement & renderCategories", () => {
        it("should be able to add an element when clicking on a selector card", () => {
            renderComponent();
            const emailElementButton = screen.getByText(
                ELEMENT_BUTTON_LABELS[EElementType.EMAIL]
            );
            fireEvent.click(emailElementButton);
            expect(mockAddElement).toHaveBeenCalledWith(
                EElementType.EMAIL,
                true
            );
        });
        it("should render all the element selector cards based on its categories", () => {
            renderComponent();
            ELEMENTS_CATEGORIES.forEach((category) => {
                expect(
                    screen.getByText(category.categoryTitle)
                ).toBeInTheDocument();
                category.elementTypes.forEach((elementType) => {
                    expect(
                        screen.getByText(ELEMENT_BUTTON_LABELS[elementType])
                    ).toBeInTheDocument();
                });
            });
        });
    });

    describe("search elements by name", () => {
        it("should show search results and cross button on search bar when input is given", async () => {
            renderComponent();
            const magnifyingGlass = screen.getByTestId("maginfying-glass");
            fireEvent.click(magnifyingGlass);
            const searchInput = screen.getByTestId("input");
            fireEvent.change(searchInput, { target: { value: "email" } });

            await waitFor(() => {
                const getEmailAddressButton =
                    screen.getByText(/email address/i);
                const getCrossButton = screen.getAllByRole("button");
                expect(getEmailAddressButton).toBeInTheDocument();
                expect(getCrossButton[0]).toBeInTheDocument();
            });
        });
        it("should be able to clear input when clicking on the cross button", async () => {
            renderComponent();
            const magnifyingGlass = screen.getByTestId("maginfying-glass");
            fireEvent.click(magnifyingGlass);
            const searchInput = screen.getByTestId("input");
            fireEvent.change(searchInput, { target: { value: "email" } });
            const getCrossButton = screen.getAllByRole("button");
            fireEvent.click(getCrossButton[0]);

            await waitFor(() => {
                expect(searchInput).toHaveValue("");
            });
        });

        it("should show results not found when input given is not an element name", async () => {
            renderComponent();
            const magnifyingGlass = screen.getByTestId("maginfying-glass");
            fireEvent.click(magnifyingGlass);
            const searchInput = screen.getByTestId("input");
            fireEvent.change(searchInput, { target: { value: "abc" } });

            await waitFor(() => {
                const getNoResultsFoundContent =
                    screen.getByText("No results found.");
                expect(getNoResultsFoundContent).toBeInTheDocument();
            });
        });

        it("should not show the category when input given is not an element name", async () => {
            renderComponent();
            const magnifyingGlass = screen.getByTestId("maginfying-glass");
            fireEvent.click(magnifyingGlass);
            const searchInput = screen.getByTestId("input");
            fireEvent.change(searchInput, { target: { value: "abc" } });

            await waitFor(() => {
                const getCategory = screen.queryByText("Text field");
                expect(getCategory).not.toBeInTheDocument();
            });
        });

        it("should not show the category option group when input given is a text field element", async () => {
            renderComponent();
            const magnifyingGlass = screen.getByTestId("maginfying-glass");
            fireEvent.click(magnifyingGlass);
            const searchInput = screen.getByTestId("input");
            fireEvent.change(searchInput, { target: { value: "email" } });

            await waitFor(() => {
                const getCategory = screen.queryByText("Option group");
                expect(getCategory).not.toBeInTheDocument();
            });
        });

        it("should show the category option group when input given is a option group element", async () => {
            renderComponent();
            const magnifyingGlass = screen.getByTestId("maginfying-glass");
            fireEvent.click(magnifyingGlass);
            const searchInput = screen.getByTestId("input");
            fireEvent.change(searchInput, { target: { value: "dropdown" } });

            await waitFor(() => {
                const getCategory = screen.queryByText("Option group");
                expect(getCategory).toBeInTheDocument();
            });
        });

        it("should not show the category text field when input given is a option group element", async () => {
            renderComponent();
            const magnifyingGlass = screen.getByTestId("maginfying-glass");
            fireEvent.click(magnifyingGlass);
            const searchInput = screen.getByTestId("input");
            fireEvent.change(searchInput, { target: { value: "dropdown" } });

            await waitFor(() => {
                const getCategory = screen.queryByText("Text field");
                expect(getCategory).not.toBeInTheDocument();
            });
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <AddElementsPanel />)
    );
};
