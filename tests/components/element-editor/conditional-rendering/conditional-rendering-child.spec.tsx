import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import {
    ConditionalRenderingChild,
    IOptions,
} from "src/components/element-editor/conditional-rendering";
import { IConditionalRendering } from "src/context-providers";
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
        renderComponent(
            {
                onDelete: mockDelete,
                options: mockOptions,
                index: mockIndex,
            },
            {
                formContext: {
                    currentValues: {
                        conditionalRendering: mockValue,
                    },
                },
            }
        );

        expect(screen.getByText("Select")).toBeInTheDocument();
        expect(screen.getByText("Equals")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Set value")).toBeInTheDocument();
    });

    it("should fire the delete function on clicking the bin icon", () => {
        renderComponent(
            {
                onDelete: mockDelete,
                options: mockOptions,
                index: mockIndex,
            },
            {
                formContext: {
                    currentValues: {
                        conditionalRendering: mockValue,
                    },
                },
            }
        );

        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect(mockDelete).toBeCalled();
    });

    it("should render an error message when validation error message field is left empty", async () => {
        renderComponent(
            {
                onDelete: mockDelete,
                options: mockOptions,
                index: mockIndex,
            },
            {
                formContext: {
                    currentValues: {
                        conditionalRendering: mockValue,
                    },
                },
            }
        );
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
    index?: number;
}

const MyTestComponent = ({
    onDelete,
    options,
    index,
}: IConditionalRenderingChildOptions) => {
    return (
        <>
            <ConditionalRenderingChild
                onDelete={onDelete}
                options={options}
                index={index}
            />
            <button type="submit">Submit</button>
        </>
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
const mockValue: IConditionalRendering[] = [
    {
        fieldKey: "",
        comparator: "Equals",
        value: String(""),
        internalId: "mock123",
    },
];
const mockIndex = 0;
