import { EFormBuilderMode, useBuilder } from "../../context-providers";
import { AddElementsPanel } from "../side-panel/add-elements-panel";
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
            case EFormBuilderMode.ADD_FIELD:
                return <AddElementsPanel />;
            default:
                return <></>;
        }
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Wrapper $isCollapsed={showSidePanel}>
            <SidePanelHeader />
            <ContentWrapper>
                {currentMode !== EFormBuilderMode.EDIT_FIELD && <Toolbar />}
                <ContentSection>{getPanelContent()}</ContentSection>
            </ContentWrapper>
        </Wrapper>
    );
};
