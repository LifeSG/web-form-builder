import { useState } from "react";
import { EBuilderMode, useBuilder } from "../../context-providers";
import { ElementEditor } from "../element-editor";
import { AddElementsPanel } from "./add-elements-panel";
import { SidePanelHeader } from "./side-panel-header";
import { ContentSection, ContentWrapper, Wrapper } from "./side-panel.styles";
import { Toolbar } from "./toolbar";

export const SidePanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, currentMode, focusedElement } = useBuilder();
    const [saveChangesHandler, setSaveChangesHandler] = useState();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderPanelContent = () => {
        if (focusedElement) {
            return (
                <ElementEditor setSaveChangesHandler={setSaveChangesHandler} />
            );
        }

        switch (currentMode) {
            case EBuilderMode.ADD_ELEMENT:
                return <AddElementsPanel />;
            default:
                return <>Some content here...</>;
        }
    };

    return (
        <Wrapper $minimised={focusedElement ? false : !showSidePanel}>
            <SidePanelHeader saveChangesHandler={saveChangesHandler} />
            <ContentWrapper>
                <ContentSection
                    $isFocusedElement={focusedElement ? true : false}
                >
                    {renderPanelContent()}
                </ContentSection>
                {focusedElement === null && <Toolbar />}
            </ContentWrapper>
        </Wrapper>
    );
};
