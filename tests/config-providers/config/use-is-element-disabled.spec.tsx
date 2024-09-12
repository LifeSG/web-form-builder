import { render, screen } from "@testing-library/react";
import {
    ConfigContext,
    EElementType,
    IFocusedElement,
    useConfigContext,
    useIsElementDisabled,
} from "src/context-providers";
import { EElementLabel, ELEMENT_BUTTON_LABELS } from "src/data";

jest.mock("src/context-providers", () => ({
    ...jest.requireActual("src/context-providers"),
    useConfigContext: jest.fn(),
}));

describe("useIsElementDisabled", () => {
    const mockUseConfigContext = useConfigContext as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return true if the element is disabled in elements config", () => {
        mockUseConfigContext.mockReturnValue({
            elements: {
                [ELEMENT_BUTTON_LABELS[EElementType.EMAIL]]: {
                    isDisabled: true,
                },
            },
        });

        render(
            <ConfigContext.Provider value={mockUseConfigContext()}>
                <TestComponent
                    elementId={MOCK_FOCUSED_ELEMENT.element.id}
                    elementType={MOCK_FOCUSED_ELEMENT.element.type}
                />
            </ConfigContext.Provider>
        );

        expect(screen.getByTestId("should-disable")).toBeDisabled();
    });

    it("should return true if the element is disabled in presetForm config", () => {
        mockUseConfigContext.mockReturnValue({
            presetForm: {
                [MOCK_FOCUSED_ELEMENT.element.id]: {
                    schema: {
                        uiType: MOCK_FOCUSED_ELEMENT.element.type,
                        label: MOCK_FOCUSED_ELEMENT.element.label,
                    },
                    isDisabled: true,
                },
            },
        });

        render(
            <ConfigContext.Provider value={mockUseConfigContext()}>
                <TestComponent
                    elementId={MOCK_FOCUSED_ELEMENT.element.id}
                    elementType={MOCK_FOCUSED_ELEMENT.element.type}
                />
            </ConfigContext.Provider>
        );

        expect(screen.getByTestId("should-disable")).toBeDisabled();
    });

    it("should prioritize element-specific config over presetForm config", () => {
        mockUseConfigContext.mockReturnValue({
            elements: {
                [EElementLabel.EMAIL]: {
                    isDisabled: false,
                },
            },
            presetForm: {
                [MOCK_FOCUSED_ELEMENT.element.id]: {
                    schema: {
                        uiType: MOCK_FOCUSED_ELEMENT.element.type,
                        label: MOCK_FOCUSED_ELEMENT.element.label,
                    },
                    isDisabled: true,
                },
            },
        });

        render(
            <ConfigContext.Provider value={mockUseConfigContext()}>
                <TestComponent
                    elementId={MOCK_FOCUSED_ELEMENT.element.id}
                    elementType={MOCK_FOCUSED_ELEMENT.element.type}
                />
            </ConfigContext.Provider>
        );

        expect(screen.getByTestId("should-disable")).not.toBeDisabled();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const TestComponent = ({
    elementId,
    elementType,
}: {
    elementId: string;
    elementType: EElementType;
}) => {
    const isDisabled = useIsElementDisabled(elementId, elementType);
    return <input data-testid="should-disable" disabled={isDisabled}></input>;
};

const MOCK_FOCUSED_ELEMENT: IFocusedElement = {
    element: {
        internalId: "mock256",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: false,
        description: "",
        preselectedValue: "",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
        columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
    },
};
