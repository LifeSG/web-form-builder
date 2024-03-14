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
    return (
        <Wrapper $mode={showSidePanel ? "minimised" : "expanded"}>
            Element List here...
        </Wrapper>
    );
};
