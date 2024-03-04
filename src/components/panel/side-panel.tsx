import { useBuilder } from "../../context-providers/builder/hook";
import { BasePanelHeader } from "./side-panel-header";
import { ContentWrapper, Wrapper } from "./side-panel.styles";
import { Toolbar } from "./toolbar";
import { IBasePanelProps } from "./types";

export const BasePanel = ({
    children,
    disableToolbar = false,
}: IBasePanelProps) => {

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
                    <BasePanelHeader />
                    <ContentWrapper>
                        <Toolbar />
                        {children}
                    </ContentWrapper>
                </>
            )}
            {!state.showSidePanel && disableToolbar && children}
        </Wrapper>
    );
};
