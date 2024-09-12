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

    it("should show the bulk edit modal when it is being passed in to modal hook", async () => {
        await renderComponent({
            displayContext: {
                modals: [bulkEditModal],
            },
        });
        const modal = screen.getByTestId("bulk-edit-modal");
        expect(modal).toBeInTheDocument();
    });

    it("should hide the modal when the 'Cancel' button is pressed", async () => {
        await renderComponent({
            displayContext: {
                modals: [bulkEditModal],
            },
        });
        const cancelButton = getCancelButton();
        fireEvent.click(cancelButton);
        expect(mockHideModal).toBeCalled();
    });

    it("should run the onClickActionButton function when the 'Save' button is clicked", async () => {
        await renderComponent({
            displayContext: {
                modals: [bulkEditModal],
            },
        });

        const saveButton = getSaveButton();
        expect(saveButton).toBeEnabled();

        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(mockOnClickActionButton).toBeCalled();
        });
    });

    it("should show an error message when the 'Save' button is clicked and the form is invalid", async () => {
        await renderComponent({
            displayContext: {
                modals: [bulkEditModal],
            },
        });

        const textArea = screen.getByRole("textbox");

        fireEvent.change(textArea, {
            target: {
                value: "a",
            },
        });

        const saveButton = getSaveButton();
        fireEvent.click(saveButton);

        await waitFor(() => {
            const errorMessage = screen.getByText(
                'Incorrect format. Check that all labels and values are filled and separated with "|".'
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it("should save successfully when the 'Save' button is clicked and the form is valid", async () => {
        await renderComponent({
            displayContext: {
                modals: [bulkEditModal],
            },
        });

        const textArea = screen.getByRole("textbox");

        fireEvent.change(textArea, {
            target: {
                value: "a | b",
            },
        });

        const saveButton = getSaveButton();
        fireEvent.click(saveButton);

        await waitFor(() => {
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
    return waitFor(() => {
        render(TestHelper.withProviders(overrideOptions, <MyTestComponent />));
    });
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
    optionsString: "",
};
