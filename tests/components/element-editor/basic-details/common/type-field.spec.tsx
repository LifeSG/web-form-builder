import { act, fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { TypeField } from "src/components/element-editor/basic-details/common";
import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

jest.mock("src/context-providers/display/modal-hook", () => ({
    useModal: () => ({
        hideModal: mockHideModal,
        showModal: mockShowModal,
    }),
}));

jest.mock("src/context-providers/builder/hook", () => {
    const actualModule = jest.requireActual(
        "src/context-providers/builder/hook"
    );
    return {
        ...actualModule,
        useBuilder: () => ({
            ...actualModule.useBuilder(),
            selectElementType: mockSelectElementType,
        }),
    };
});

describe("TypeField", () => {
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

    it("should show the reset fields modal when the type is changed", async () => {
        renderComponent();

        const typeField = screen.getByTestId("type-field");
        fireEvent.click(typeField);

        const shortTextOption = await screen.findByText("Short text");
        expect(shortTextOption).toBeInTheDocument();
        fireEvent.click(shortTextOption);

        expect(mockShowModal).toHaveBeenCalled();
    });

    it("should execute the callbacks of onClickActionButton when the 'Reset all fields' button is clicked", async () => {
        renderComponent();
        const typeField = screen.getByTestId("type-field");
        fireEvent.click(typeField);

        const shortTextOption = await screen.findByText("Short text");
        expect(shortTextOption).toBeInTheDocument();
        fireEvent.click(shortTextOption);

        act(() => {
            mockShowModal.mock.lastCall[0].onClickActionButton();
        });

        expect(mockHideModal).toHaveBeenCalled();
        expect(mockSelectElementType).toHaveBeenCalledWith(EElementType.TEXT);

        expect(screen.getByTestId("type-field")).toHaveTextContent(
            "Short text"
        );
    });

    it("should execute the callbacks of onClose when the 'Return to edit' button is clicked", async () => {
        renderComponent({
            builderContext: {
                selectedElementType: EElementType.EMAIL,
            },
        });
        const typeField = screen.getByTestId("type-field");
        fireEvent.click(typeField);

        const shortTextOption = await screen.findByText("Short text");
        expect(shortTextOption).toBeInTheDocument();
        fireEvent.click(shortTextOption);

        act(() => {
            mockShowModal.mock.lastCall[0].onClose();
        });

        expect(mockHideModal).toHaveBeenCalled();
        expect(screen.getByTestId("type-field")).toHaveTextContent(
            "Email address"
        );
    });

    it("should be disabled when the element is disabled", async () => {
        renderComponent({
            configContext: {
                elements: {
                    "Email address": {
                        isDisabled: true,
                    },
                },
            },
            builderContext: {
                selectedElementType: EElementType.EMAIL,
                focusedElement: {
                    element: MOCK_FOCUSED_ELEMENT,
                },
            },
        });

        const typeField = screen.getByTestId("type-field");
        fireEvent.click(typeField);

        const shortTextOption = screen.queryByText("Short text");
        expect(shortTextOption).not.toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <TypeField />));
};

// =============================================================================
// MOCKS
// =============================================================================
const mockHideModal = jest.fn();
const mockShowModal = jest.fn();
const mockSelectElementType = jest.fn();

const MOCK_FOCUSED_ELEMENT: TElement = {
    internalId: "mock256",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: false,
    description: "",
    preselectedValue: "",
    label: ELEMENT_BUTTON_LABELS[EElementType.TEXTAREA],
    columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
};
