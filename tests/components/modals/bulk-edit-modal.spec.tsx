import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "jest-canvas-mock";
import { Modals } from "src/components";
import { EModalType, IBulkEditModalProps } from "src/context-providers";
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

describe("Bulk Edit Modal", () => {
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

    it("should show the bulk edit modal when it is being passed in to modal hook", () => {
        renderComponent({
            displayContext: {
                modals: [bulkEditModal],
            },
        });
        const modal = screen.getByTestId("bulk-edit-modal");
        expect(modal).toBeInTheDocument();
    });

    it("should hide the modal when the 'Cancel' button is pressed", async () => {
        renderComponent({
            displayContext: {
                modals: [bulkEditModal],
            },
        });
        const cancelButton = getCancelButton();
        fireEvent.click(cancelButton);
        expect(mockHideModal).toBeCalled();
    });

    it("should run the onClickActionButton function when the 'Save' button is clicked", () => {
        renderComponent({
            displayContext: {
                modals: [bulkEditModal],
            },
        });
        const saveButton = getSaveButton();
        fireEvent.click(saveButton);

        waitFor(() => {
            expect(mockOnClickActionButton).toBeCalled();
        });
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

const getCancelButton = () =>
    screen.getByRole("button", {
        name: "Cancel",
    });

const getSaveButton = () =>
    screen.getByRole("button", {
        name: "Save",
    });

// =============================================================================
// MOCKS
// =============================================================================
const mockOnClickActionButton = jest.fn();
const bulkEditModal: IBulkEditModalProps = {
    type: EModalType.BulkEdit,
    onClickActionButton: mockOnClickActionButton,
    dropdownItemsString: "",
};
