import { Layout } from "@lifesg/react-design-system/layout";
import { ComponentProps } from "react";
import { useBuilder } from "../../context-providers/builder/hook";
import { BasePanelHeader } from "./base-panel-header";
import { BasePanelWrapper } from "./base-panel.styles";
import { Toolbar } from "./toolbar";

export interface IBasePanelProps extends ComponentProps<"div"> {
    disableToolbar?: boolean;
}

export const BasePanel = ({
    children,
    disableToolbar = false,
}: IBasePanelProps) => {
    const { state } = useBuilder();
    return (
            <BasePanelWrapper $isCollapsed={state.showPanel}>
                {!disableToolbar && (
                    <>
                        <BasePanelHeader />
                        <Toolbar />
                    </>
                )}
                {!state.showPanel && children}
            </BasePanelWrapper>
    );
};
