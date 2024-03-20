import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import noop from "lodash/noop";
import { useBuilder } from "src/context-providers";
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
    const { showSidePanel, orderedIdentifiers, elements } = useBuilder();
    const renderMode = showSidePanel ? "minimised" : "expanded";

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderElements = () => {
        return orderedIdentifiers.map((identifier, index) => {
            const element = elements[identifier.internalId];

            return (
                <ElementItemWrapper key={index} $mode={renderMode} $size="full">
                    {/* TODO: Add click handling */}
                    <ElementCard element={element} onClick={noop} />
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
