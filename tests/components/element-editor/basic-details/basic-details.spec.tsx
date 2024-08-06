import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
            await waitFor(() => {
                renderComponent({
                    builderContext: {
                        focusedElement: MOCK_FOCUSED_ELEMENT,
                        selectedElementType: EElementType.EMAIL,
                    },
                });
            });
            const labelField = await getLabelField();
            expect(labelField).toBeInTheDocument();
        });

        it("should render required error message if element has required error message property", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_ELEMENT,
                    selectedElementType: EElementType.EMAIL,
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
                    selectedElementType: EElementType.EMAIL,
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
                    selectedElementType: EElementType.TEXTAREA,
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
            renderComponent({
                builderContext: {
                    focusedElement: MOCK_FOCUSED_TEXT_AREA_ELEMENT,
                    selectedElementType: EElementType.TEXTAREA,
                },
            });

            const pillsField = await screen.findByText("Pills");
            expect(pillsField).toBeInTheDocument();
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    return <BasicDetails />;
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
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
