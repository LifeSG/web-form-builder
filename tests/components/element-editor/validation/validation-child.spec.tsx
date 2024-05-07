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
            onChange: mockOnChange,
        });
        expect(screen.getByText("Select")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter rule")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Set error message")
        ).toBeInTheDocument();
    });

    it("should fire the delete function on clicking the bin icon", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
        });
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect(mockDelete).toBeCalled();
    });

    it("should render the validation type field as disabled when there is only 1 option", () => {
        renderComponent({
            onDelete: mockDelete,
            options: ["Option 1"],
            onChange: mockOnChange,
        });
        const getValidationTypeField = screen.getByRole("button", {
            name: "Option 1",
        });
        expect(getValidationTypeField).toBeInTheDocument();
        expect(getValidationTypeField).toBeDisabled();
    });

    it("should fire onChange when there is a change in the input fields", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
        });
        const getValidationRuleField =
            screen.getByPlaceholderText("Enter rule");
        fireEvent.focus(getValidationRuleField);
        fireEvent.change(getValidationRuleField, {
            target: { value: "camel_Case" },
        });
        expect(mockOnChange).toBeCalled();
    });
});

const renderComponent = (
    validationChildOptions: {
        onDelete?: () => void;
        options?: string[];
        onChange?: (newValue: any) => void;
    } = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    const { onDelete, options, onChange } = validationChildOptions;
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <ValidationChild
                onDelete={onDelete}
                options={options}
                onChange={onChange}
            />
        )
    );
};

// =============================================================================
// MOCKS
// =============================================================================
const mockOptions = ["Option 1", "Option 2"];
const mockDelete = jest.fn();
const mockOnChange = jest.fn();
