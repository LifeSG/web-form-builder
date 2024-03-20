import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import { useBuilder } from "src/context-providers";
import { TElement } from "src/schemas";
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
        focusedElement,
        focusElement,
    } = useBuilder();
    const renderMode = showSidePanel ? "minimised" : "expanded";

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleElementCardClick = (element: TElement) => () => {
        if (focusedElement.element.internalId !== element.internalId) {
            focusElement(element);
        }
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
