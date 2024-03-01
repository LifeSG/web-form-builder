import React from "react";
export interface IBasePanelProps {
    children: React.ReactNode;
    disableToolbar?: boolean;
}

export interface IWrapperStyleProps {
    $isCollapsed: boolean;
}

export interface IHeaderStyleProps {
    $isCollapsed: boolean;
}
