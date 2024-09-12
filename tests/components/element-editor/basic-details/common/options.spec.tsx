import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { act } from "react-dom/test-utils";
import { Options } from "src/components/element-editor/basic-details/common/options";
import { EElementType } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("Options", () => {
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

    describe("rendering the items", () => {
        it("should render the option items with 2 empty options if the element type is dropdown", async () => {
            renderComponent({
                formContext: {
                    defaultValues: {
                        optionItems: [
                            { label: "", value: "" },
                            { label: "", value: "" },
                        ],
                    },
                },
            });

            const options = await screen.findByText(LABEL);
            expect(options).toBeInTheDocument();

            const optionItems = screen.getAllByTestId("option-child");
            expect(optionItems).toHaveLength(2);
        });

        it("should append a new item when the add button is clicked", async () => {
            renderComponent({
                formContext: {
                    defaultValues: {
                        optionItems: [
                            { label: "Option 1", value: "Option 1" },
                            { label: "Option 2", value: "Option 2" },
                        ],
                    },
                },
            });

            const addOptionButton = getAddDropdownOptionButton();

            expect(addOptionButton).toBeInTheDocument();

            let optionItems = screen.getAllByTestId("option-child");

            expect(optionItems).toHaveLength(2);

            await act(async () => {
                fireEvent.click(addOptionButton);
            });

            optionItems = screen.getAllByTestId("option-label");

            expect(optionItems).toHaveLength(3);
        });

        it("should delete an item when the bin icon button is clicked and there are at least 3 options", async () => {
            renderComponent({
                formContext: {
                    defaultValues: {
                        optionItems: [
                            { label: "Option 1", value: "Option 1" },
                            { label: "Option 2", value: "Option 2" },
                        ],
                    },
                },
            });

            await act(async () => {
                fireEvent.click(getAddDropdownOptionButton());
            });

            let optionItems = screen.getAllByTestId("option-label");

            expect(optionItems).toHaveLength(3);

            const deleteButton = screen.getAllByTestId("delete-button")[0];

            expect(deleteButton).toBeInTheDocument();

            await act(async () => {
                fireEvent.click(deleteButton);
            });

            optionItems = screen.getAllByTestId("option-label");

            expect(optionItems).toHaveLength(2);
        });
    });

    describe("validation", () => {
        it("should not be able to submit the form if there are less than 2 valid items", async () => {
            renderComponent({
                builderContext: {
                    selectedElementType: EElementType.DROPDOWN,
                },
                formContext: {
                    defaultValues: {
                        optionItems: [
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

            // Initially there are 2 empty items
            expect(labelError).toHaveLength(2);
            expect(valueError).toHaveLength(2);
        });
    });
});

// =============================================================================
// CONSTANTS
// =============================================================================
const LABEL = "label";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    return (
        <>
            <Options
                label={LABEL}
                description="Description"
                fieldName="dropdownItems"
            />
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
