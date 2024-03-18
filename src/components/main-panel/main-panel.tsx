import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import { useBuilder } from "src/context-providers";
import {
    EmptyDisplayDescription,
    EmptyDisplayTitle,
    EmptyDisplayWrapper,
    Wrapper,
} from "./main-panel.styles";

export const MainPanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, createdElementsIds } = useBuilder();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    if (createdElementsIds.length === 0) {
        return (
            <EmptyDisplayWrapper
                $mode={showSidePanel ? "minimised" : "expanded"}
            >
                <ErrorDisplay type="no-item-found" imageOnly />
                <EmptyDisplayTitle weight="semibold">
                    Form is empty
                </EmptyDisplayTitle>
                <EmptyDisplayDescription>
                    Add an element to start building your form!
                </EmptyDisplayDescription>
            </EmptyDisplayWrapper>
        );
    }

    return (
        <Wrapper $mode={showSidePanel ? "minimised" : "expanded"}>
            Element lists here...
        </Wrapper>
    );
};
