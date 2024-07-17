import { yupResolver } from "@hookform/resolvers/yup";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { act } from "react-dom/test-utils";
import { FormProvider, useForm } from "react-hook-form";
import { DropdownItems } from "src/components/element-editor/basic-details/dropdown-items/dropdown-items";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { SchemaHelper } from "src/schemas";
import { TestHelper } from "src/util/test-helper";

describe("Dropdown Items", () => {
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

    describe("rendering the dropdown items", () => {
        it("should render the dropdown items if the element type is dropdown", async () => {
            renderComponent();

            const dropdownItems = await screen.findByText("Dropdown items");
            expect(dropdownItems).toBeInTheDocument();
        });

        it("should append a new dropdown item when the add button is clicked", async () => {
            renderComponent();

            const addDropdownOptionButton = getAddDropdownOptionButton();

            expect(addDropdownOptionButton).toBeInTheDocument();

            let dropdownItems = screen.getAllByTestId("dropdown-item-label");

            expect(dropdownItems).toHaveLength(2);

            await act(async () => {
                fireEvent.click(addDropdownOptionButton);
            });

            dropdownItems = screen.getAllByTestId("dropdown-item-label");

            expect(dropdownItems).toHaveLength(3);
        });

        it("should delete a dropdown item when the bin icon button is clicked and there are at least 3 options", async () => {
            renderComponent();

            await act(async () => {
                fireEvent.click(getAddDropdownOptionButton());
            });

            let dropdownItems = screen.getAllByTestId("dropdown-item-label");

            expect(dropdownItems).toHaveLength(3);

            const deleteButton = screen.getAllByTestId(
                "dropdown-items-bin-button"
            )[0];

            expect(deleteButton).toBeInTheDocument();

            await act(async () => {
                fireEvent.click(deleteButton);
            });

            dropdownItems = screen.getAllByTestId("dropdown-item-label");

            expect(dropdownItems).toHaveLength(2);
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.DROPDOWN)),
    });
    return (
        <FormProvider {...methods}>
            <DropdownItems />
        </FormProvider>
    );
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};

const getAddDropdownOptionButton = () => {
    return screen.getByRole("button", { name: "Add Option" });
};

// =============================================================================
// MOCKS
// =============================================================================

const MOCK_FOCUSED_DROPDOWN_ELEMENT = {
    element: {
        internalId: "mock123",
        type: EElementType.DROPDOWN,
        id: "mockElement",
        required: false,
        label: ELEMENT_BUTTON_LABELS[EElementType.DROPDOWN],
        columns: {
            desktop: 12,
            tablet: 8,
            mobile: 4,
        } as const,
        dropdownItems: [
            { label: "", value: "" },
            { label: "", value: "" },
        ],
    },
};
