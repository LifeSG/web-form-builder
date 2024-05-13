import { yupResolver } from "@hookform/resolvers/yup";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { useForm, FormProvider } from "react-hook-form";
import {
    ConditionalRenderingChild,
    IOptions,
} from "src/components/element-editor/conditional-rendering";
import { EElementType, IConditionalRendering } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { SchemaHelper } from "src/schemas";
import { TestHelper } from "src/util/test-helper";

describe("ConditionalRenderingChild", () => {
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
            value: mockValue,
        });

        const getValueField = screen.getByPlaceholderText("Set value");
        fireEvent.focus(getValueField);
        fireEvent.change(getValueField, {
            target: { value: "mockValue" },
        });
        expect(mockOnChange).toBeCalled();
    });

    it("should render an error message when validation error message field is left empty", async () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
            value: mockValue,
            index: mockIndex,
        });
        const submitButton = screen.getByText("Submit");
        fireEvent.click(submitButton);
        const referenceError = await screen.findByText("Reference required.");
        const referenceValueError = await screen.findByText(
            "Reference value required."
        );
        expect(referenceError).toHaveTextContent("Reference required.");
        expect(referenceValueError).toHaveTextContent(
            "Reference value required."
        );
    });
});

interface IConditionalRenderingChildOptions {
    onDelete?: () => void;
    options?: IOptions[];
    onChange?: (newValue: any) => void;
    value?: IConditionalRendering;
    index?: number;
}

const MyTestComponent = ({
    onDelete,
    options,
    onChange,
    value,
    index,
}: IConditionalRenderingChildOptions) => {
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });
    const onSubmit = jest.fn;
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <ConditionalRenderingChild
                    onDelete={onDelete}
                    options={options}
                    onChange={onChange}
                    value={value}
                    index={index}
                />
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
};

const renderComponent = (
    conditionalRenderingChildOptions: IConditionalRenderingChildOptions = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <MyTestComponent {...conditionalRenderingChildOptions} />
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
    internalId: "mock123",
};
const mockIndex = 0;
