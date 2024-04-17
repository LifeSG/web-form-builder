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
        focusedElement,
    } = useBuilder();

    const finalMode = focusedElement ? true : showSidePanel;
    const renderMode = finalMode ? "minimised" : "expanded";

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleElementCardClick = (element: TElement) => () => {
        focusElement(element);
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderElements = () => {
        return orderedIdentifiers.map((identifier, index) => {
            const element = elements[identifier.internalId];

            return (
                <ElementItemWrapper key={index} $mode={renderMode} $size="full">
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
            <EmptyDisplayWrapper $mode={renderMode}>
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
