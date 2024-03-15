import { SidePanelHeader } from "./side-panel-header";
import { Toolbar } from "./toolbar";
import { ContentWrapper, ContentSection, Wrapper } from "./side-panel.styles";
import { EFormBuilderMode, useBuilder } from "../../context-providers";

export const SidePanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, currentMode } = useBuilder();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Wrapper $isCollapsed={!showSidePanel}>
            <SidePanelHeader />
            <ContentWrapper>
                <ContentSection>Render contents conditionally</ContentSection>
                {currentMode !== EFormBuilderMode.EDIT_FIELD && <Toolbar />}
            </ContentWrapper>
        </Wrapper>
    );
};
