import { EBuilderMode, useBuilder } from "../../context-providers";
import { AddElementsPanel } from "./add-elements-panel";
import { SidePanelHeader } from "./side-panel-header";
import { ContentSection, ContentWrapper, Wrapper } from "./side-panel.styles";
import { Toolbar } from "./toolbar";

export const SidePanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, currentMode, focusedElement } = useBuilder();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderPanelContent = () => {
        if (focusedElement) {
            return <>Some content here...</>;
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
            <SidePanelHeader />
            <ContentWrapper>
                <ContentSection>{renderPanelContent()}</ContentSection>
                {focusedElement === null && <Toolbar />}
            </ContentWrapper>
        </Wrapper>
    );
};
