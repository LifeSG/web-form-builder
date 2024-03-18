import { EBuilderMode, useBuilder } from "../../context-providers";
import { AddElementsPanel } from "./add-elements-panel";
import { SidePanelHeader } from "./side-panel-header";
import { ContentSection, ContentWrapper, Wrapper } from "./side-panel.styles";
import { Toolbar } from "./toolbar";

export const SidePanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, currentMode } = useBuilder();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const getPanelContent = () => {
        switch (currentMode) {
            case EBuilderMode.ADD_ELEMENT:
                return <AddElementsPanel />;
            default:
                return <>Some content here...</>;
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Wrapper $isCollapsed={!showSidePanel}>
            <SidePanelHeader />
            <ContentWrapper>
                <ContentSection>{getPanelContent()}</ContentSection>
                {currentMode !== EBuilderMode.EDIT_ELEMENT && <Toolbar />}
            </ContentWrapper>
        </Wrapper>
    );
};
