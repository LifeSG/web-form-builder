import { render, screen } from "@testing-library/react";
import {
    ConfigContext,
    EElementType,
    IFocusedElement,
    TCustomisableGlobalAttributes,
    useConfigContext,
    useIsAttributeDisabled,
} from "src/context-providers";
import { EElementLabel, ELEMENT_BUTTON_LABELS } from "src/data";

jest.mock("src/context-providers", () => ({
    ...jest.requireActual("src/context-providers"),
    useConfigContext: jest.fn(),
}));

describe("useIsAttributeDisabled", () => {
    const mockUseConfigContext = useConfigContext as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return true if the attribute is disabled in elements config", () => {
        mockUseConfigContext.mockReturnValue({
            elements: {
                [ELEMENT_BUTTON_LABELS[EElementType.EMAIL]]: {
                    attributes: {
                        type: {
                            isDisabled: true,
                        },
                    },
                },
            },
        });

        render(
            <ConfigContext.Provider value={mockUseConfigContext()}>
                <TestComponent
                    focusedElement={MOCK_FOCUSED_ELEMENT}
                    attribute="type"
                />
            </ConfigContext.Provider>
        );

        expect(screen.getByTestId("should-disable")).toBeDisabled();
    });

    it("should return true if the attribute is disabled in global attributes config", () => {
        mockUseConfigContext.mockReturnValue({
            attributes: {
                type: {
                    isDisabled: true,
                },
            },
        });

        render(
            <ConfigContext.Provider value={mockUseConfigContext()}>
                <TestComponent
                    focusedElement={MOCK_FOCUSED_ELEMENT}
                    attribute="type"
                />
            </ConfigContext.Provider>
        );

        expect(screen.getByTestId("should-disable")).toBeDisabled();
    });

    it("should prioritize element-specific config over global attributes", () => {
        mockUseConfigContext.mockReturnValue({
            elements: {
                [EElementLabel.EMAIL]: {
                    attributes: {
                        type: {
                            isDisabled: false,
                        },
                    },
                },
            },
            attributes: {
                type: {
                    isDisabled: true,
                },
            },
        });

        render(
            <ConfigContext.Provider value={mockUseConfigContext()}>
                <TestComponent
                    focusedElement={MOCK_FOCUSED_ELEMENT}
                    attribute="type"
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
    focusedElement,
    attribute,
}: {
    focusedElement: IFocusedElement;
    attribute: keyof TCustomisableGlobalAttributes;
}) => {
    const isDisabled = useIsAttributeDisabled(focusedElement, attribute);
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
        label: ELEMENT_BUTTON_LABELS[EElementType.TEXTAREA],
        columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
    },
};
