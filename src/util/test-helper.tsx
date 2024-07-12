import { BaseTheme } from "@lifesg/react-design-system";
import { noop } from "lodash";
import React from "react";
import {
    BuilderContext,
    DisplayContext,
    EBuilderMode,
    IBuilderState,
    IDisplayState,
} from "src/context-providers";
import { ThemeProvider } from "styled-components";

const mockBuilderState: IBuilderState = {
    mode: EBuilderMode.ADD_ELEMENT,
    elements: {},
    focusedElement: null,
    showSidePanel: true,
    orderedIdentifiers: [],
    deletedElements: {},
    elementCounter: 0,
};

const mockDisplayState: IDisplayState = {
    toasts: [],
    modals: [],
};

export namespace TestHelper {
    export interface RenderOptions {
        builderContext?: Partial<IBuilderState>;
        displayContext?: Partial<IDisplayState>;
    }

    export const withProviders = (
        { builderContext, displayContext }: RenderOptions = {},
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
                    <DisplayContext.Provider
                        value={{
                            state: { ...mockDisplayState, ...displayContext },
                            dispatch: noop,
                        }}
                    >
                        {component}
                    </DisplayContext.Provider>
                </BuilderContext.Provider>
            </ThemeProvider>
        );
    };
}
