import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import {
    ConditionalRenderingChild,
    IOptions,
} from "src/components/element-editor/conditional-rendering";
import { IConditionalRendering } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("ConditionalRenderingChild", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should render the component with provided options and fields", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
            value: mockValue,
        });
        expect(screen.getByText("Select")).toBeInTheDocument();
        expect(screen.getByText("Equals")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Set value")).toBeInTheDocument();
    });

    it("should fire the delete function on clicking the bin icon", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
            value: mockValue,
        });
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect(mockDelete).toBeCalled();
    });

    it("should fire onChange when there is a change in the input fields", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
        });
        const getValueField = screen.getByPlaceholderText("Set value");
        fireEvent.focus(getValueField);
        fireEvent.change(getValueField, {
            target: { value: "mockValue" },
        });
        expect(mockOnChange).toBeCalled();
    });
});

const renderComponent = (
    validationChildOptions: {
        onDelete?: () => void;
        options?: IOptions[];
        onChange?: (newValue: any) => void;
        value?: IConditionalRendering;
    } = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    const { onDelete, options, onChange, value } = validationChildOptions;
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <ConditionalRenderingChild
                onDelete={onDelete}
                options={options}
                onChange={onChange}
                value={value}
            />
        )
    );
};

// =============================================================================
// MOCKS
// =============================================================================
const mockOptions = [{ label: "mockLabel1", id: "mockId1" }];
const mockDelete = jest.fn();
const mockOnChange = jest.fn();
const mockValue = {
    fieldKey: "",
    comparator: "Equals",
    value: "",
};
