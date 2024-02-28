import { ComponentProps, createContext } from "react";
import { useImmerReducer } from "use-immer";
import { TState, TAction, TMainContext } from "./types";
import { EFormBuilderMode, EFormBuilderView } from "src/types";
import { noop } from "lodash";

// =============================================================================
// DEFAULT VALUES
// =============================================================================
const DEFAULT_VALUES: TState = {
    mode: EFormBuilderMode.ADD_FIELD,
    view: EFormBuilderView.EDIT_FORM,
};

// =============================================================================
// REDUCER
// =============================================================================

export const mainReducer = (state: TState, action: TAction) => {
    return state;
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// =============================================================================
// CONTEXT
// =============================================================================
export const MainContext = createContext<TMainContext>({
    state: DEFAULT_VALUES,
    dispatch: noop,
});

// =============================================================================
// CONTEXT PROVIDER
// =============================================================================
export const MainProvider = ({ children }: ComponentProps<"div">) => {
    const [state, dispatch] = useImmerReducer(mainReducer, DEFAULT_VALUES);

    return (
        <MainContext.Provider value={{ state, dispatch }}>
            {children}
        </MainContext.Provider>
    );
};
