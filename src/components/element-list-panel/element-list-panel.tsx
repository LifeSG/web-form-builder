import { ColDivProps } from "@lifesg/react-design-system/layout";
import { useBuilder } from "src/context-providers";
import { Wrapper } from "./element-list-panel.styles";

export const ElementListPanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel } = useBuilder();

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

    return <Wrapper {...getColProps()}>Element List here...</Wrapper>;
};
