import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { PrefillChild } from "src/components/element-editor/prefill";
import { IPrefill } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("PrefillChild", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should render the component with provided options and fields", () => {
        renderComponent({
            onDelete: mockDelete,
            onChange: mockOnChange,
            value: mockEmptyValue,
        });
        expect(screen.getByText("Select")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter a path")).toBeInTheDocument();
    });

    it("should render fields with prefilled values given the prefill mode is 'Previous source", () => {
        renderComponent({
            onDelete: mockDelete,
            onChange: mockOnChange,
            value: mockValue,
        });
        const getValidationTypeField = screen.getByRole("button", {
            name: "Previous source",
        });
        expect(getValidationTypeField).toBeInTheDocument();
        expect(screen.getByDisplayValue("mockId")).toBeInTheDocument();
        expect(screen.getByDisplayValue("mockPath")).toBeInTheDocument();
    });

    it("should render fields with prefilled values given the prefill mode is 'Myinfo'", () => {
        const myInfoValue = {
            prefillMode: "Myinfo",
            path: "mockPath",
        };
        renderComponent({
            onDelete: mockDelete,
            onChange: mockOnChange,
            value: myInfoValue,
        });
        const getValidationTypeField = screen.getByRole("button", {
            name: "Myinfo",
        });
        expect(getValidationTypeField).toBeInTheDocument();
        expect(screen.getByDisplayValue("mockPath")).toBeInTheDocument();
    });

    it("should fire the delete function on clicking the bin icon", () => {
        renderComponent({
            onDelete: mockDelete,
            onChange: mockOnChange,
            value: mockEmptyValue,
        });
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect(mockDelete).toBeCalled();
    });

    it("should fire onChange when there is a change in the input fields", () => {
        renderComponent({
            onDelete: mockDelete,
            onChange: mockOnChange,
            value: mockEmptyValue,
        });
        const getPrefillPathField = screen.getByPlaceholderText("Enter a path");
        fireEvent.focus(getPrefillPathField);
        fireEvent.change(getPrefillPathField, {
            target: { value: "path" },
        });
        expect(mockOnChange).toBeCalled();
    });
});

type PrefillChildOptions = {
    onDelete?: () => void;
    onChange?: (newValue: any) => void;
    value?: IPrefill;
};

const MyTestComponent = ({
    prefillChildOptions = {},
}: { prefillChildOptions?: PrefillChildOptions } = {}) => {
    const { onDelete, onChange, value } = prefillChildOptions;
    return (
        <PrefillChild onDelete={onDelete} onChange={onChange} value={value} />
    );
};

const renderComponent = (
    prefillChildOptions: PrefillChildOptions = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <MyTestComponent prefillChildOptions={prefillChildOptions} />
        )
    );
};

// =============================================================================
// MOCKS
// =============================================================================
const mockDelete = jest.fn();
const mockOnChange = jest.fn();
const mockValue = {
    prefillMode: "Previous source",
    actionId: "mockId",
    path: "mockPath",
};

const mockEmptyValue = {
    prefillMode: "",
    path: "",
};
