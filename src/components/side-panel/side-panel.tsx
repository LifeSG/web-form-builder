import { EBuilderMode, useBuilder } from "../../context-providers";
import { AddElementsPanel } from "./add-elements-panel";
import { EditPagesPanel } from "./edit-pages-panel";
import { SidePanelHeader } from "./side-panel-header";
import { ContentSection, ContentWrapper, Wrapper } from "./side-panel.styles";
import { Toolbar } from "./toolbar";

export const SidePanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, currentMode } = useBuilder();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderPanelContent = () => {
        switch (currentMode) {
            case EBuilderMode.ADD_ELEMENT:
                return <AddElementsPanel />;
            case EBuilderMode.MANAGE_PAGES:
                return <EditPagesPanel />;
            default:
                return <>Some content here...</>;
        }
    };

    return (
        <Wrapper $isCollapsed={!showSidePanel}>
            <SidePanelHeader />
            <ContentWrapper>
                <ContentSection>{renderPanelContent()}</ContentSection>
                {currentMode !== EBuilderMode.EDIT_ELEMENT && <Toolbar />}
            </ContentWrapper>
        </Wrapper>
    );
};
