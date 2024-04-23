import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { ValidationChild } from "src/components/element-editor/validation";
import { TestHelper } from "src/util/test-helper";

describe("ValidationChild", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should render the component with provided options and fields", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
        });
        expect(screen.getByText("Select")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter rule")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Set error message")
        ).toBeInTheDocument();
    });

    it("should run the delete function when clicking on the bin icon", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
        });
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect(mockDelete).toBeCalled();
    });

    it("should render the validation type field as disabled when there is only 1 option", () => {
        renderComponent({
            onDelete: mockDelete,
            options: ["Option 1"],
        });
        const getValidationTypeField = screen.getByRole("button", {
            name: "Option 1",
        });
        expect(getValidationTypeField).toBeInTheDocument();
        expect(getValidationTypeField).toBeDisabled();
    });
});

const renderComponent = (
    validationChildOptions: {
        onDelete?: () => void;
        options?: string[];
    } = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    const { onDelete, options } = validationChildOptions;
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <ValidationChild onDelete={onDelete} options={options} />
        )
    );
};

// =============================================================================
// MOCKS
// =============================================================================
const mockOptions = ["Option 1", "Option 2"];
const mockDelete = jest.fn();
