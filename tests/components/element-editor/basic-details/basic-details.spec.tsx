import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { BasicDetails } from "src/components/element-editor/basic-details";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

describe("BasicDetails", () => {
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

    describe("rendering label & required error message fields", () => {
        it("should render label if element has label property", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
            });
            const labelField = await getLabelField();
            expect(labelField).toBeInTheDocument();
        });

        it("should render required error message if element has required error message property", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
            });
            fireEvent.click(await screen.findByLabelText("Yes"));

            const requiredErrorMessageField =
                await screen.findByLabelText("Error message");
            expect(requiredErrorMessageField).toBeInTheDocument();
        });

        it("should render the description if element has the description property", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
            });

            const descriptionField = await screen.findByText(
                "Description text (optional)"
            );
            expect(descriptionField).toBeInTheDocument();
        });

        it("should render the preselected field & resizable area input field if element has the preselected value & resizable area input field property", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_TEXT_AREA_ELEMENT,
                    elements: MOCK_TEXT_AREA_ELEMENTS,
                },
                formContext: {
                    defaultValues: {
                        type: EElementType.TEXTAREA,
                    },
                },
            });

            const resizableAreaInput = await screen.findByText(
                "Resizable area input"
            );
            const preSelectedField = await screen.findByText(
                "Pre-selected value (optional)"
            );
            expect(resizableAreaInput).toBeInTheDocument();
            expect(preSelectedField).toBeInTheDocument();
        });

        it("should render the pills fields if element has pills field", async () => {
            renderComponent(EElementType.TEXTAREA, {
                builderContext: {
                    focusedElement: MOCK_FOCUSED_TEXT_AREA_ELEMENT,
                    elements: MOCK_TEXT_AREA_ELEMENTS,
                },
            });

            const pillsField = await screen.findByText("Pills");
            const pillItemsField = await screen.findByText("Pill Items");
            const pillPositionField = await screen.findByText("Pill Items");
            expect(pillsField).toBeInTheDocument();
            expect(pillItemsField).toBeInTheDocument();
            expect(pillPositionField).toBeInTheDocument();
        });

        it("should render the popover when hovering over the disabled delete button when there are less than 2 pillItems", async () => {
            renderComponent(EElementType.TEXTAREA, {
                builderContext: {
                    focusedElement: MOCK_FOCUSED_TEXT_AREA_ELEMENT,
                    elements: MOCK_TEXT_AREA_ELEMENTS,
                },
            });

            fireEvent.mouseOver(deleteButton());
            const popoverText = await screen.findByTestId(
                "delete-button-popover-0"
            );
            expect(popoverText).toBeInTheDocument();
        });

        it("should not render the popover when hovering over the disabled delete button when there are more than 2 pillItems", async () => {
            renderComponent(EElementType.TEXTAREA, {
                builderContext: {
                    focusedElement: MOCK_FOCUSED_TEXT_AREA_ELEMENT,
                    elements: MOCK_TEXT_AREA_ELEMENTS,
                },
            });
            const addOptionButton = screen.getByRole("button", {
                name: "Add option",
            });

            fireEvent.click(addOptionButton);
            fireEvent.mouseOver(deleteButton());
            const popoverText = screen.queryByTestId("delete-button-popover-0");
            expect(popoverText).not.toBeInTheDocument();
        });
    });

    describe("rendering the error messages for the fields", () => {
        it("should render an error message for the ID field if it is empty", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
            });
            const idInput = await getIdField();
            fireEvent.focus(idInput);
            fireEvent.change(idInput, { target: { value: null } });
            fireEvent.blur(idInput);
            const idErrorMessage = await screen.findByText("ID required.");
            expect(idErrorMessage).toHaveTextContent("ID required.");
        });

        it("should render an error message for the ID field if it is invalid", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
            });
            const idInput = await getIdField();
            fireEvent.focus(idInput);
            fireEvent.change(idInput, { target: { value: "camel_Case" } });
            fireEvent.blur(idInput);
            const idErrorMessage = await screen.findByText(
                "ID must be camelCase."
            );
            expect(idErrorMessage).toHaveTextContent("ID must be camelCase.");
        });

        it("should render an error message for the label field if it is empty", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
            });
            const labelInput = await getLabelField();
            fireEvent.focus(labelInput);
            fireEvent.change(labelInput, { target: { value: "" } });
            fireEvent.blur(labelInput);
            const labelErrorMessage =
                await screen.findByText("Label required.");
            expect(labelErrorMessage).toHaveTextContent("Label required.");
        });
    });

    describe("rendering the preselected value", () => {
        it("should render the preselected value if the element type is dropdown and there is at least 1 valid dropdown item", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_DROPDOWN_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
                formContext: {
                    elementType: EElementType.DROPDOWN,
                    defaultValues: {
                        type: EElementType.DROPDOWN,
                    },
                },
            });

            const dropdownItem = screen.getByText("Dropdown items");
            expect(dropdownItem).toBeInTheDocument();

            const dropdownItemLabels = await screen.findAllByTestId(
                "dropdown-item-label"
            );
            const dropdownItemValues = await screen.findAllByTestId(
                "dropdown-item-value"
            );

            expect(dropdownItemLabels[0]).toBeInTheDocument();
            expect(dropdownItemValues[0]).toBeInTheDocument();

            expect(
                screen.queryByText("Pre-selected value (optional)")
            ).not.toBeInTheDocument();

            fireEvent.change(dropdownItemLabels[0], {
                target: { value: "New Label" },
            });
            fireEvent.change(dropdownItemValues[0], {
                target: { value: "New Value" },
            });

            expect(dropdownItemLabels[0]).toHaveValue("New Label");
            expect(dropdownItemValues[0]).toHaveValue("New Value");

            const preselectedValue = await screen.findByText(
                "Pre-selected value (optional)"
            );

            expect(preselectedValue).toBeInTheDocument();
        });
    });

    describe("submitting the form for dropdown element", () => {
        it("should not be able to submit the form if there are not at least 2 valid dropdown items", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_DROPDOWN_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
                formContext: {
                    elementType: EElementType.DROPDOWN,
                    defaultValues: {
                        type: EElementType.DROPDOWN,
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
            <BasicDetails />
            <button type="submit">Submit</button>
        </>
    );
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};

const getIdField = async () => {
    return screen.findByPlaceholderText("Create an ID");
};

const getLabelField = async () => {
    return screen.findByLabelText("Element Name");
};

const deleteButton: () => HTMLElement = () =>
    screen.getByTestId("delete-button-0");

// =============================================================================
// MOCKS
// =============================================================================

const MOCK_FOCUSED_ELEMENT = {
    element: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: false,
        description: "hellooo",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
        columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
    },
};

const MOCK_FOCUSED_DROPDOWN_ELEMENT = {
    element: {
        internalId: "mock123",
        type: EElementType.DROPDOWN,
        id: "mockElement",
        required: false,
        label: ELEMENT_BUTTON_LABELS[EElementType.DROPDOWN],
        columns: {
            desktop: 12,
            tablet: 8,
            mobile: 4,
        } as const,
        dropdownItems: [
            { label: "", value: "" },
            { label: "", value: "" },
        ],
    },
};

const MOCK_ELEMENTS = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: false,
        description: "hellooo",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
        columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
    },
};

const MOCK_FOCUSED_TEXT_AREA_ELEMENT = {
    element: {
        internalId: "mock256",
        type: EElementType.TEXTAREA,
        id: "mockElement",
        required: false,
        description: "hellooo",
        preSelectedValue: "",
        resizableInput: true,
        pills: true,
        pillItems: [{ content: "" }, { content: "" }],
        pillPosition: "top",
        label: ELEMENT_BUTTON_LABELS[EElementType.TEXTAREA],
        columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
    },
};
const MOCK_TEXT_AREA_ELEMENTS = {
    mock256: {
        internalId: "mock256",
        type: EElementType.TEXTAREA,
        id: "mockElement",
        required: false,
        description: "hellooo",
        preSelectedValue: "",
        resizableInput: true,
        pills: true,
        pillItems: [{ content: "" }, { content: "" }],
        pillPosition: "top",
        label: ELEMENT_BUTTON_LABELS[EElementType.TEXTAREA],
        columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
    },
};
