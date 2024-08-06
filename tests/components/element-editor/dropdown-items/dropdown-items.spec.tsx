import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { act } from "react-dom/test-utils";
import { DropdownItems } from "src/components/element-editor/basic-details/dropdown/dropdown-items";
import { EElementType } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("DropdownItems", () => {
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

    describe("submitting the form for dropdown element", () => {
        it("should not be able to submit the form if there are not at least 2 valid dropdown items", async () => {
            renderComponent({
                builderContext: {
                    selectedElementType: EElementType.DROPDOWN,
                },
                formContext: {
                    defaultValues: {
                        dropdownItems: [
                            { label: "", value: "" },
                            { label: "", value: "" },
                        ],
                    },
                },
            });

            const submitButton = screen.getByText("Submit");
            fireEvent.click(submitButton);

            const labelError = await screen.findAllByText(
                "Option label required."
            );
            const valueError = await screen.findAllByText(
                "Option value required."
            );

            // Initially there are 2 empty dropdown items
            expect(labelError).toHaveLength(2);
            expect(valueError).toHaveLength(2);
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    return (
        <>
            <DropdownItems />
            <button type="submit">Submit</button>
        </>
    );
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};

const getAddDropdownOptionButton = () => {
    return screen.getByRole("button", { name: "Add Option" });
};
