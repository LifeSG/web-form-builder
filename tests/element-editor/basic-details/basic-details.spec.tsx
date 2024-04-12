import { yupResolver } from "@hookform/resolvers/yup";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { FormProvider, useForm } from "react-hook-form";
import { BasicDetails } from "src/components/element-editor/basic-details";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { SchemaHelper } from "src/schemas";
import { TestHelper } from "src/util/test-helper";

describe("basic-details", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("rendering label & required error message fields", () => {
        it("should render label if property is there", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
            });

            const labelField = await getLabelField();
            expect(labelField).toBeInTheDocument();
        });

        it("should render required error message if property is there", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
            });

            fireEvent.click(await getYesToggleButton());

            const requiredErrorMessageField =
                await getRequiredErrorMessageInputField();
            expect(requiredErrorMessageField).toBeInTheDocument();
        });
    });

    describe("rendering the error messages for the fields", () => {
        it("should render an error message for the ID field when empty", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
            });
            const idInput = await getIdField();
            fireEvent.focus(idInput);
            fireEvent.blur(idInput);
            const idErrorMessage = await getFieldErrorMessage();
            expect(idErrorMessage).toHaveTextContent("ID is required");
        });

        it("should render an error message for the ID field when input is invalid", async () => {
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
            const idErrorMessage = await getFieldErrorMessage();
            expect(idErrorMessage).toHaveTextContent("ID must be camelCase");
        });

        it("should render an error message for the label field", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_ELEMENT,
                    elements: MOCK_ELEMENTS,
                },
            });
            const labelInput = await getLabelField();
            fireEvent.focus(labelInput);
            fireEvent.blur(labelInput);
            const labelErrorMessage = await getFieldErrorMessage();
            expect(labelErrorMessage).toHaveTextContent(
                "label is a required field"
            );
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
    const element = await screen.findByTestId("id-field");
    return element;
};

const getLabelField = async () => {
    const element = await screen.findByTestId("label-field");
    return element;
};

const getYesToggleButton = async () => {
    const element = await screen.findByLabelText("Yes");
    return element;
};

const getRequiredErrorMessageInputField = async () => {
    const element = await screen.findByLabelText("Error message");
    return element;
};

const getFieldErrorMessage = async () => {
    const element = await screen.findByTestId("form-field-error-message");
    return element;
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

jest.mock("src/context-providers/builder/hook", () => ({
    useBuilder: () => ({
        elements: MOCK_ELEMENTS,
        focusedElement: MOCK_FOCUSED_ELEMENT,
    }),
}));
