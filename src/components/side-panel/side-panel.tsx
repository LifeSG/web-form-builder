import { SidePanelHeader } from "./side-panel-header";
import { Toolbar } from "./toolbar";
import { ContentWrapper, SidePanelBody, Wrapper } from "./side-panel.styles";
import { ISidePanelProps } from "./types";
import { useBuilder } from "../../context-providers";

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
            {/* {!disableToolbar && (
                <>
                    <SidePanelHeader headerTitle="Add Elements" />
                    <ContentWrapper>
                        <Toolbar />
                        <SidePanelBody>{children}</SidePanelBody>
                    </ContentWrapper>
                </>
            )}
            {!state.showSidePanel && disableToolbar && children} */}
            <SidePanelHeader headerTitle="Add Elements" />
                    <ContentWrapper>
                        <Toolbar />
                        <SidePanelBody>{children}</SidePanelBody>
                    </ContentWrapper>
        </Wrapper>
    );
};
