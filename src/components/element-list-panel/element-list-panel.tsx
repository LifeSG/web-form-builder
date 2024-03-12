import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import { ColDivProps } from "@lifesg/react-design-system/layout";
import { useBuilder } from "src/context-providers";
import {
    EmptyDisplay,
    EmptyDisplayDescription,
    EmptyDisplayTitle,
    Wrapper,
} from "./element-list-panel.styles";

export const ElementListPanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, createdElements } = useBuilder();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const getColProps = (): ColDivProps => {
        if (showSidePanel) {
            return {
                desktopCols: 6,
                tabletCols: 7,
            };
        } else {
            return {
                desktopCols: [3, 10],
                tabletCols: 7,
            };
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderContent = () => {
        if (createdElements.length === 0) {
            return (
                <EmptyDisplay>
                    <ErrorDisplay type="no-item-found" imageOnly />
                    <EmptyDisplayTitle weight="semibold">
                        Form is empty
                    </EmptyDisplayTitle>
                    <EmptyDisplayDescription>
                        Add an element to start building your form!
                    </EmptyDisplayDescription>
                </EmptyDisplay>
            );
        } else {
            return <span>Element List here...</span>;
        }
    };

    return <Wrapper {...getColProps()}>{renderContent()}</Wrapper>;
};
