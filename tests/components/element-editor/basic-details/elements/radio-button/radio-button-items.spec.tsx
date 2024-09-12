import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { act } from "react-dom/test-utils";
import { RadioButtonItems } from "src/components/element-editor/basic-details/elements/radio-button/radio-button-items";
import { EElementType } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("RadioButtonItems", () => {
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

    describe("rendering the radio button items", () => {
        it("should render the radio button items with 2 empty options", async () => {
            renderComponent({
                formContext: {
                    defaultValues: {
                        radioItems: [
                            { label: "", value: "" },
                            { label: "", value: "" },
                        ],
                    },
                },
            });

            const listItemsContainer = await screen.findByText("List items");
            expect(listItemsContainer).toBeInTheDocument();

            const listItems = screen.getAllByTestId("option-child");
            expect(listItems).toHaveLength(2);
        });

        it("should append a new radio button item when the add button is clicked", async () => {
            renderComponent({
                formContext: {
                    defaultValues: {
                        radioItems: [
                            { label: "Option 1", value: "Option 1" },
                            { label: "Option 2", value: "Option 2" },
                        ],
                    },
                },
            });

            const addOptionButton = getAddOptionButton();

            expect(addOptionButton).toBeInTheDocument();

            let radioButtonItems = screen.getAllByTestId("option-child");

            expect(radioButtonItems).toHaveLength(2);

            await act(async () => {
                fireEvent.click(addOptionButton);
            });

            radioButtonItems = screen.getAllByTestId("option-label");

            expect(radioButtonItems).toHaveLength(3);
        });

        it("should delete a radio button item when the bin icon button is clicked and there are at least 3 options", async () => {
            renderComponent({
                formContext: {
                    defaultValues: {
                        radioItems: [
                            { label: "Option 1", value: "Option 1" },
                            { label: "Option 2", value: "Option 2" },
                        ],
                    },
                },
            });

            await act(async () => {
                fireEvent.click(getAddOptionButton());
            });

            let radioButtonItems = screen.getAllByTestId("option-label");

            expect(radioButtonItems).toHaveLength(3);

            const deleteButton = screen.getAllByTestId("delete-button")[0];

            expect(deleteButton).toBeInTheDocument();

            await act(async () => {
                fireEvent.click(deleteButton);
            });

            radioButtonItems = screen.getAllByTestId("option-label");

            expect(radioButtonItems).toHaveLength(2);
        });
    });

    describe("submitting the form for radio button element", () => {
        it("should not be able to submit the form if there are not at least 2 valid radio button items", async () => {
            renderComponent({
                builderContext: {
                    selectedElementType: EElementType.RADIO,
                },
                formContext: {
                    defaultValues: {
                        radioItems: [
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
            <RadioButtonItems />
            <button type="submit">Submit</button>
        </>
    );
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};

const getAddOptionButton = () => {
    return screen.getByRole("button", { name: "Add Option" });
};
