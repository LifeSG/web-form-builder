import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { MultiEntry } from "src/components";
import { TestHelper } from "src/util/test-helper";

describe("MultiEntry", () => {
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

    it("should contain the the component with the title, buttonLabel & children being passed into it", () => {
        renderComponent({
            title: mockTitle,
            buttonLabel: mockButtonLabel,
            children: mockChild,
            onAdd: mockOnAdd,
            disabledButton: false,
        });
        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText("Add " + mockButtonLabel)).toBeInTheDocument();
        expect(screen.getByText("Children content")).toBeInTheDocument();
    });

    it("should run onAdd when the button is being clicked", () => {
        renderComponent({
            title: mockTitle,
            buttonLabel: mockButtonLabel,
            children: mockChild,
            onAdd: mockOnAdd,
            disabledButton: false,
        });
        fireEvent.click(getButton());
        expect(mockOnAdd).toBeCalled();
    });

    it("should disable the button when condition to disable it is fulfilled", () => {
        renderComponent({
            title: mockTitle,
            buttonLabel: mockButtonLabel,
            children: mockChild,
            onAdd: mockOnAdd,
            disabledButton: true,
        });
        expect(getButton()).toBeDisabled();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (
    options: {
        title?: string;
        buttonLabel?: string;
        onAdd?: () => void;
        children?: React.ReactNode;
        disabledButton?: boolean;
    } = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    const { title, buttonLabel, onAdd, children, disabledButton } = options;
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <MultiEntry
                title={title}
                buttonLabel={buttonLabel}
                onAdd={onAdd}
                disabledButton={disabledButton}
            >
                {children}
            </MultiEntry>
        )
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
