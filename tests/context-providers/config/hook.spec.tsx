import { render, screen } from "@testing-library/react";
import { useConfigContext, useShouldShowField } from "src/context-providers";
import { EElementLabel } from "src/data";

jest.mock("src/context-providers/config/config-hook", () => ({
    useConfigContext: jest.fn(),
}));

describe("useShouldShowField", () => {
    const mockUseConfigContext = useConfigContext as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return true if the field is not specified in elements or attributes", () => {
        mockUseConfigContext.mockReturnValue({
            elements: {},
            attributes: {},
        });

        render(
            <TestComponent
                fieldName="label"
                elementName={EElementLabel.EMAIL}
            />
        );

        expect(screen.getByTestId("should-show").textContent).toBe("Visible");
    });

    it("should return false if shouldShow is false in global attributes", () => {
        mockUseConfigContext.mockReturnValue({
            elements: {},
            attributes: {
                label: {
                    shouldShow: false,
                },
            },
        });

        render(
            <TestComponent
                fieldName="label"
                elementName={EElementLabel.EMAIL}
            />
        );

        expect(screen.getByTestId("should-show").textContent).toBe("Hidden");
    });

    it("should return true if shouldShow is true in element-specific config", () => {
        mockUseConfigContext.mockReturnValue({
            elements: {
                [EElementLabel.EMAIL]: {
                    attributes: {
                        label: {
                            shouldShow: true,
                        },
                    },
                },
            },
            attributes: {},
        });

        render(
            <TestComponent
                fieldName="label"
                elementName={EElementLabel.EMAIL}
            />
        );

        expect(screen.getByTestId("should-show").textContent).toBe("Visible");
    });

    it("should prioritize element-specific config over global attributes", () => {
        mockUseConfigContext.mockReturnValue({
            elements: {
                [EElementLabel.EMAIL]: {
                    attributes: {
                        label: {
                            shouldShow: true,
                        },
                    },
                },
            },
            attributes: {
                label: {
                    shouldShow: false,
                },
            },
        });

        render(
            <TestComponent
                fieldName="label"
                elementName={EElementLabel.EMAIL}
            />
        );

        expect(screen.getByTestId("should-show").textContent).toBe("Visible");
    });

    it("should return false if shouldShow is false in element-specific config", () => {
        mockUseConfigContext.mockReturnValue({
            elements: {
                [EElementLabel.EMAIL]: {
                    attributes: {
                        label: {
                            shouldShow: false,
                        },
                    },
                },
            },
            attributes: {},
        });

        render(
            <TestComponent
                fieldName="label"
                elementName={EElementLabel.EMAIL}
            />
        );

        expect(screen.getByTestId("should-show").textContent).toBe("Hidden");
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const TestComponent = ({
    fieldName,
    elementName,
}: {
    fieldName: string;
    elementName: EElementLabel;
}) => {
    const shouldShow = useShouldShowField(fieldName, elementName);
    return (
        <div data-testid="should-show">{shouldShow ? "Visible" : "Hidden"}</div>
    );
};
