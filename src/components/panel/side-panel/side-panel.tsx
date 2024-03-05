import { useBuilder } from "../../../context-providers/builder/hook";
import { Toolbar } from "../toolbar";
import { SidePanelHeader } from "./side-panel-header";
import { ContentWrapper, SidePanelBody, Wrapper } from "./side-panel.styles";
import { ISidePanelProps } from "./types";

export const SidePanel = ({
    children,
    disableToolbar = false,
}: ISidePanelProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { state } = useBuilder();

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Wrapper $isCollapsed={state.showSidePanel}>
            {!disableToolbar && (
                <>
                    <SidePanelHeader headerTitle="Add Elements" />
                    <ContentWrapper>
                        <Toolbar />
                        <SidePanelBody>{children}</SidePanelBody>
                    </ContentWrapper>
                </>
            )}
            {!state.showSidePanel && disableToolbar && children}
        </Wrapper>
    );
};
