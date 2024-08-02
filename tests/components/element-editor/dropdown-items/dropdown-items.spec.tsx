import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { act } from "react-dom/test-utils";
import { DropdownItems } from "src/components/element-editor/basic-details/dropdown/dropdown-items";
import { TestHelper } from "src/util/test-helper";

describe("Dropdown Items", () => {
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

    describe("rendering the dropdown items", () => {
        it("should render the dropdown items with 2 empty options if the element type is dropdown", async () => {
            renderComponent({
                formContext: {
                    defaultValues: {
                        dropdownItems: [
                            { label: "", value: "" },
                            { label: "", value: "" },
                        ],
                    },
                },
            });

            const dropdownItemsContainer =
                await screen.findByText("Dropdown items");
            expect(dropdownItemsContainer).toBeInTheDocument();

            const dropdownItems = screen.getAllByTestId("dropdown-item-child");
            expect(dropdownItems).toHaveLength(2);
        });

        it("should append a new dropdown item when the add button is clicked", async () => {
            renderComponent({
                formContext: {
                    defaultValues: {
                        dropdownItems: [
                            { label: "Option 1", value: "Option 1" },
                            { label: "Option 2", value: "Option 2" },
                        ],
                    },
                },
            });

            const addDropdownOptionButton = getAddDropdownOptionButton();

            expect(addDropdownOptionButton).toBeInTheDocument();

            let dropdownItems = screen.getAllByTestId("dropdown-item-child");

            expect(dropdownItems).toHaveLength(2);

            await act(async () => {
                fireEvent.click(addDropdownOptionButton);
            });

            dropdownItems = screen.getAllByTestId("dropdown-item-label");

            expect(dropdownItems).toHaveLength(3);
        });

        it("should delete a dropdown item when the bin icon button is clicked and there are at least 3 options", async () => {
            renderComponent({
                formContext: {
                    defaultValues: {
                        dropdownItems: [
                            { label: "Option 1", value: "Option 1" },
                            { label: "Option 2", value: "Option 2" },
                        ],
                    },
                },
            });

            await act(async () => {
                fireEvent.click(getAddDropdownOptionButton());
            });

            let dropdownItems = screen.getAllByTestId("dropdown-item-label");

            expect(dropdownItems).toHaveLength(3);

            const deleteButton = screen.getAllByTestId("delete-button")[0];

            expect(deleteButton).toBeInTheDocument();

            await act(async () => {
                fireEvent.click(deleteButton);
            });

            dropdownItems = screen.getAllByTestId("dropdown-item-label");

            expect(dropdownItems).toHaveLength(2);
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    return <DropdownItems />;
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};

const getAddDropdownOptionButton = () => {
    return screen.getByRole("button", { name: "Add Option" });
};
