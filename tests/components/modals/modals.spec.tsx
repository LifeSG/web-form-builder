import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { Modals } from "src/components";
import { EModalType } from "src/context-providers";
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

describe("Modals", () => {
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

    it("should render a modal when there is a modal in modal state", () => {
        renderComponent({
            displayContext: {
                modals: [{ type: EModalType.Custom }],
            },
        });
        const getModal = screen.getByTestId("modal-content");
        expect(getModal).toBeInTheDocument();
    });

    it("should run the hideModal function when the cross button clicks", () => {
        renderComponent({
            displayContext: {
                modals: [{ type: EModalType.Custom }],
            },
        });
        const getModalCloseButton = screen.getByTestId("close-button");
        const getModal = screen.getByTestId("modal-content");
        fireEvent.click(getModalCloseButton);
        expect(getModal).toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    const onSubmit = mockShowModal();
    return (
        <>
            <Modals />
            <button type="submit" onClick={onSubmit}>
                Submit
            </button>
        </>
    );
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};

const getButton = () =>
    screen.getByRole("button", {
        name: "Add " + mockButtonLabel,
    });

// =============================================================================
// MOCKS
// =============================================================================
const mockChild = <h1>Children content</h1>;
const mockOnAdd = jest.fn();
const mockTitle = "Test title";
const mockButtonLabel = "button";
