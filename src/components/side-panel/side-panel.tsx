import { SidePanelHeader } from "./side-panel-header";
import { Toolbar } from "./toolbar";
import { ContentWrapper, ContentSection, Wrapper } from "./side-panel.styles";
import { EBuilderMode, useBuilder } from "../../context-providers";

export const SidePanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { showSidePanel, currentMode } = useBuilder();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Wrapper $isCollapsed={showSidePanel}>
            <SidePanelHeader />
            <ContentWrapper>
                {currentMode !== EBuilderMode.EDIT_FIELD && <Toolbar />}
                <ContentSection>Render contents conditionally</ContentSection>
            </ContentWrapper>
        </Wrapper>
    );
};
