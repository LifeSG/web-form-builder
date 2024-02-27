import { BaseTheme } from "@lifesg/react-design-system/theme";
import { ComponentProps, createContext } from "react";
import { ThemeProvider } from "styled-components";
import { useImmerReducer } from "use-immer";
import {
    IFormBuilderState,
    TFormBuilderAction,
    TFormBuilderContext,
} from "./types";
import { EFormBuilderMode, EFormBuilderView } from "src/types";

// =============================================================================
// DEFAULT VALUES
// =============================================================================
const DEFAULT_VALUES: IFormBuilderState = {
    mode: EFormBuilderMode.ADD_FIELD,
    view: EFormBuilderView.EDIT_FORM,
};

// =============================================================================
// REDUCER
// =============================================================================

export const formBuilderReducer = (
    state: IFormBuilderState,
    action: TFormBuilderAction
) => {
    //
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// =============================================================================
// CONTEXT
// =============================================================================
export const FormBuilderContext = createContext<TFormBuilderContext>({
    state: DEFAULT_VALUES,
    dispatch: () => null,
});

// =============================================================================
// CONTEXT PROVIDER
// =============================================================================
export const FormBuilderProvider = ({ children }: ComponentProps<"div">) => {
    const [state, dispatch] = useImmerReducer(
        formBuilderReducer,
        DEFAULT_VALUES
    );

    return (
        <ThemeProvider theme={BaseTheme}>
            <FormBuilderContext.Provider value={{ state, dispatch }}>
                {children}
            </FormBuilderContext.Provider>
        </ThemeProvider>
    );
};
