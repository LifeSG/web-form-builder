import { BaseTheme } from "@lifesg/react-design-system";
import { noop } from "lodash";
import React from "react";
import {
    BuilderContext,
    EBuilderMode,
    IBuilderState,
} from "src/context-providers";
import { ThemeProvider } from "styled-components";

export const mockBuilderState: IBuilderState = {
    mode: EBuilderMode.ADD_ELEMENT,
    elements: {},
    focusedElement: null,
    showSidePanel: true,
    orderedIdentifiers: [],
};

export namespace TestHelper {
    export interface RenderOptions {
        builderContext?: Partial<IBuilderState>;
    }

    export const withProviders = (
        { builderContext }: RenderOptions = {},
        component: React.ReactNode
    ) => {
        return (
            <ThemeProvider theme={BaseTheme}>
                <BuilderContext.Provider
                    value={{
                        state: { ...mockBuilderState, ...builderContext },
                        dispatch: noop,
                    }}
                >
                    {component}
                </BuilderContext.Provider>
            </ThemeProvider>
        );
    };
}
