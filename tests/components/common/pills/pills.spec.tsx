import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { Pills } from "src/components/common/pills";
import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

describe("Pills", () => {
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

    it("should render pills as false by default and pill items should not be present", async () => {
        const MOCK_FOCUSED_TEXT_AREA_ELEMENT: TElement = {
            internalId: "mock256",
            type: EElementType.TEXTAREA,
            id: "mockElement",
            required: false,
            description: "",
            preselectedValue: "",
            pills: false,
            pillItems: [{ content: "" }, { content: "" }],
            label: ELEMENT_BUTTON_LABELS[EElementType.TEXTAREA],
            columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
        };

        renderComponent({
            builderContext: {
                focusedElement: {
                    element: MOCK_FOCUSED_TEXT_AREA_ELEMENT,
                },
                selectedElementType: EElementType.TEXTAREA,
            },
        });

        const togglePillsNoButton = screen.getByLabelText("No");
        expect(togglePillsNoButton).toBeChecked();

        expect(screen.queryByText("Pill items")).toBeNull();
        expect(screen.queryByText("List position")).toBeNull();
    });

    it("should conditionally render the pill items and list position fields if pills is toggled to true", async () => {
        const MOCK_FOCUSED_TEXT_AREA_ELEMENT: TElement = {
            internalId: "mock256",
            type: EElementType.TEXTAREA,
            id: "mockElement",
            required: false,
            description: "",
            preselectedValue: "",
            pills: true,
            pillItems: [{ content: "" }, { content: "" }],
            label: ELEMENT_BUTTON_LABELS[EElementType.TEXTAREA],
            columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
        };

        renderComponent({
            builderContext: {
                focusedElement: {
                    element: MOCK_FOCUSED_TEXT_AREA_ELEMENT,
                },
                selectedElementType: EElementType.TEXTAREA,
            },
        });

        const pillItemsField = await screen.findByText("Pill items");

        const listPositionField = await screen.findByText("List position");
        expect(pillItemsField).toBeInTheDocument();
        expect(listPositionField).toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <Pills />));
};
