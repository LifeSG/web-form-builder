import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import { TElement, useBuilder } from "src/context-providers";
import { ElementCard } from "../element-card";
import {
    ElementItemWrapper,
    ElementsWrapper,
    EmptyDisplayDescription,
    EmptyDisplayTitle,
    EmptyDisplayWrapper,
    Wrapper,
} from "./main-panel.styles";

export const MainPanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const {
        showSidePanel,
        orderedIdentifiers,
        elements,
        focusElement,
        togglePanel,
    } = useBuilder();
    const renderMode = showSidePanel ? "minimised" : "expanded";

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleElementCardClick = (element: TElement) => () => {
        /**
         * TODO: Add check if element is dirty when setting focus
         * Hardcode to false for now
         */
        focusElement(element, false);
        togglePanel(true);
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderElements = () => {
        return orderedIdentifiers.map((identifier, index) => {
            const element = elements[identifier.internalId];

            return (
                <ElementItemWrapper
                    key={index}
                    $mode={renderMode}
                    $size="full"
                    data-testid="element-content"
                >
                    <ElementCard
                        element={element}
                        onClick={handleElementCardClick(element)}
                    />
                </ElementItemWrapper>
            );
        });
    };

    if (orderedIdentifiers.length === 0) {
        return (
            <EmptyDisplayWrapper $mode={renderMode} data-testid="empty-content">
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
        <Wrapper $mode={renderMode}>
            <ElementsWrapper $mode={renderMode}>
                {renderElements()}
            </ElementsWrapper>
        </Wrapper>
    );
};
