import { yupResolver } from "@hookform/resolvers/yup";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { FormProvider, useForm } from "react-hook-form";
import { BasicDetails } from "src/components/element-editor/basic-details";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { SchemaHelper } from "src/schemas";
import { TestHelper } from "src/util/test-helper";

jest.mock("src/context-providers/builder/hook", () => ({
    useBuilder: () => ({
        elements: MOCK_ELEMENTS,
        focusedElement: MOCK_FOCUSED_ELEMENT,
        updateFocusedElement: jest.fn(),
    }),
}));

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
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });
    return (
        <FormProvider {...methods}>
            <BasicDetails />
        </FormProvider>
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

// =============================================================================
// MOCKS
// =============================================================================

const MOCK_FOCUSED_ELEMENT = {
    element: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: false,
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    },
};

const MOCK_ELEMENTS = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: false,
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    },
};
