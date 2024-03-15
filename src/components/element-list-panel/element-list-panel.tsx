import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import { useBuilder } from "src/context-providers";
import {
    EmptyDisplayDescription,
    EmptyDisplayTitle,
    EmptyDisplayWrapper,
    Wrapper,
} from "./element-list-panel.styles";

export const ElementListPanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, createdElements } = useBuilder();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    if (createdElements.length === 0) {
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
