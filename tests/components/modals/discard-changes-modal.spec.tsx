import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { Modals } from "src/components";
import { EModalType, IDiscardChangesModalProps } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

// =============================================================================
// MOCKS
// =============================================================================
const mockShowModal = jest.fn();
const mockHideModal = jest.fn();
jest.mock("src/context-providers/display/modal-hook.tsx", () => {
    const actual = jest.requireActual(
        "src/context-providers/display/modal-hook.tsx"
    );
    return {
        useModal: () => ({
            ...actual.useModal(),
            showModal: mockShowModal,
            hideModal: mockHideModal,
        }),
    };
});

describe("Discard changes modals", () => {
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

    it("should show the discardModal when discard changes modal type is being passed in", () => {
        renderComponent({
            displayContext: {
                modals: [newModal],
            },
        });
        const getModalTitle = screen.getByText("Discard changes?");
        const discardChangesButton = getDiscardChangesButton();
        const keepEditingButton = getKeepEditingButton();
        expect(getModalTitle).toBeInTheDocument();
        expect(discardChangesButton).toBeInTheDocument();
        expect(keepEditingButton).toBeInTheDocument();
    });

    it("should hide the modal when the 'Keep editing' button is pressed", async () => {
        renderComponent({
            displayContext: {
                modals: [newModal],
            },
        });
        const keepEditingButton = getKeepEditingButton();
        fireEvent.click(keepEditingButton);
        expect(mockHideModal).toBeCalled();
    });

    it("should run the onClickActionButton function when the 'Discard changes' button is clicked", () => {
        renderComponent({
            displayContext: {
                modals: [newModal],
            },
        });
        const discardChangesButton = getDiscardChangesButton();
        fireEvent.click(discardChangesButton);
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

const getDiscardChangesButton = () =>
    screen.getByRole("button", {
        name: "Discard changes",
    });

const getKeepEditingButton = () =>
    screen.getByRole("button", {
        name: "Keep editing",
    });

// =============================================================================
// MOCKS
// =============================================================================
const mockOnClickActionButton = jest.fn();
const newModal: IDiscardChangesModalProps = {
    type: EModalType.DiscardChanges,
    onClickActionButton: mockOnClickActionButton,
};
