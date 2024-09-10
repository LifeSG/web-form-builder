import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import {
    ConditionalRenderingChild,
    IOptions,
} from "src/components/element-editor/conditional-rendering";
import {
    EElementType,
    IConditionalRendering,
    TCustomisableElementAttributes,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
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

    describe("hiding of form field based on Form Builder Config", () => {
        it("should show the id label if shouldShow in attributes is not configured", async () => {
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

            const selectElement = screen.getByText("Select");
            fireEvent.click(selectElement);

            const labelElement1 = screen.getByText("mockLabel1");
            const idElement1 = screen.getByText("ID: mockId1");

            expect(labelElement1).toBeInTheDocument();
            expect(idElement1).toBeInTheDocument();
        });

        it("should hide the id label if shouldShow in attributes is set to false", async () => {
            renderComponent(
                {
                    onDelete: mockDelete,
                    options: mockOptions,
                    index: mockIndex,
                },
                {
                    configContext: {
                        attributes: {
                            id: {
                                shouldShow: false,
                            },
                        },
                    },
                    formContext: {
                        currentValues: {
                            conditionalRendering: mockValue,
                        },
                    },
                }
            );

            const selectElement = screen.getByText("Select");
            fireEvent.click(selectElement);

            const labelElement1 = screen.getByText("mockLabel1");
            const idElement1 = screen.queryByText("ID: mockId1");

            expect(labelElement1).toBeInTheDocument();
            expect(idElement1).not.toBeInTheDocument();
        });

        it.each(Object.values(EElementType))(
            "should only show the id label for %s element if shouldShow in attributes is set to false but overridden by custom %s element settings",
            async (elementType) => {
                const mockOptions: IOptions[] = [
                    {
                        label: "mockLabel1",
                        id: "mockId1",
                        elementType: Object.values(EElementType).find(
                            (e) => e !== elementType
                        ),
                    },
                    {
                        label: "mockLabel2",
                        id: "mockId2",
                        elementType,
                    },
                ];
                renderComponent(
                    {
                        onDelete: mockDelete,
                        options: mockOptions,
                        index: mockIndex,
                    },
                    {
                        configContext: {
                            attributes: {
                                id: {
                                    shouldShow: false,
                                },
                            },
                            elements: {
                                [ELEMENT_BUTTON_LABELS[elementType]]: {
                                    attributes: {
                                        id: {
                                            shouldShow: true,
                                        },
                                    },
                                },
                            },
                        },
                        formContext: {
                            currentValues: {
                                conditionalRendering: mockValue,
                            },
                        },
                    }
                );

                const selectElement = screen.getByText("Select");
                fireEvent.click(selectElement);

                const labelElement1 = screen.getByText("mockLabel1");
                const idElement1 = screen.queryByText("ID: mockId1");

                const labelElement2 = screen.getByText("mockLabel2");
                const idElement2 = screen.getByText("ID: mockId2");

                expect(labelElement1).toBeInTheDocument();
                expect(idElement1).not.toBeInTheDocument();

                expect(labelElement2).toBeInTheDocument();
                expect(idElement2).toBeInTheDocument();
            }
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
const mockOptions: IOptions[] = [
    {
        label: "mockLabel1",
        id: "mockId1",
        elementType: EElementType.EMAIL,
    },
];
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
