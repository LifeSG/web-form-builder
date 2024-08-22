import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { Modals } from "src/components";
import { EModalType, IResetFieldsModalProps } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

// =============================================================================
// MOCKS
// =============================================================================
const mockShowModal = jest.fn();
jest.mock("src/context-providers/display/modal-hook.tsx", () => {
    const actual = jest.requireActual(
        "src/context-providers/display/modal-hook.tsx"
    );
    return {
        useModal: () => ({
            ...actual.useModal(),
            showModal: mockShowModal,
        }),
    };
});

describe("ResetFieldsModal", () => {
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

    it("should show the ResetFieldsModal when the corresponding modal type is being passed in", () => {
        renderComponent({
            displayContext: {
                modals: [newModal],
            },
        });
        const getModalTitle = screen.getByText("Reset all fields?");
        const resetAllFieldsButton = getResetAllFieldsButton();
        const returnToEditButton = getReturnToEditButton();

        expect(getModalTitle).toBeInTheDocument();
        expect(resetAllFieldsButton).toBeInTheDocument();
        expect(returnToEditButton).toBeInTheDocument();
    });

    it("should run the onClose function when the 'Return to edit' button is clicked", async () => {
        renderComponent({
            displayContext: {
                modals: [newModal],
            },
        });
        const returnToEditButton = getReturnToEditButton();
        fireEvent.click(returnToEditButton);
        expect(mockOnClose).toBeCalled();
    });

    it("should run the onClickActionButton function when the 'Reset all fields' button is clicked", () => {
        renderComponent({
            displayContext: {
                modals: [newModal],
            },
        });
        const resetAllFieldsButton = getResetAllFieldsButton();
        fireEvent.click(resetAllFieldsButton);
        expect(mockOnClickActionButton).toBeCalled();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    return <Modals />;
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};

const getResetAllFieldsButton = () =>
    screen.getByRole("button", {
        name: "Reset all fields",
    });

const getReturnToEditButton = () =>
    screen.getByRole("button", {
        name: "Return to edit",
    });

// =============================================================================
// MOCKS
// =============================================================================
const mockOnClickActionButton = jest.fn();
const mockOnClose = jest.fn();

const newModal: IResetFieldsModalProps = {
    type: EModalType.ResetFields,
    onClickActionButton: mockOnClickActionButton,
    onClose: mockOnClose,
};
