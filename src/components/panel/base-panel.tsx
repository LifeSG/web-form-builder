import { useBuilder } from "../../context-providers/builder/hook";
import { BasePanelHeader } from "./base-panel-header";
import { Wrapper } from "./base-panel.styles";
import { Toolbar } from "./toolbar";
import { IBasePanelProps } from "./types";

export const BasePanel = ({
    children,
    disableToolbar = false,
}: IBasePanelProps) => {
    const { state } = useBuilder();
    return (
        <Wrapper $isCollapsed={state.showPanel}>
            {!disableToolbar && (
                <>
                    <BasePanelHeader />
                    <Toolbar />
                </>
            )}
            {!state.showPanel && children}
        </Wrapper>
    );
};
