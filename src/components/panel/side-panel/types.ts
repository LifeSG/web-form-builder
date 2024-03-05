import React from "react";

// =============================================================================
// INTERFACES
// =============================================================================
export interface ISidePanelProps {
    children?: React.ReactNode;
    disableToolbar?: boolean;
}

export interface ISidePanelHeaderProps {
    onClickSaveChanges?: boolean;
    headerTitle?: string;
}
