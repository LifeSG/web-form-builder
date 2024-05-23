import { noop } from "lodash";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { IDisplayState, TDisplayAction, TDisplayContext } from "./types";

// =============================================================================
// DEFAULT VALUES
// =============================================================================
const DEFAULT_DISPLAY_VALUES: IDisplayState = {
    toast: [],
};

// =============================================================================
// REDUCER
// =============================================================================
export const displayReducer = (
    state: IDisplayState,
    action: TDisplayAction
) => {
    switch (action.type) {
        case "show-toast": {
            state.toast = [...state.toast, action.payload];
            break;
        }
        case "dismiss-toast": {
            const index = state.toast.findIndex(
                (toast) => toast.id === action.payload
            );
            if (index !== -1) {
                const toastQueue = [
                    ...state.toast.slice(0, index),
                    ...state.toast.slice(index + 1),
                ];

                state.toast = toastQueue;
            }
            break;
        }
    }

    return state;
};

// =============================================================================
// CONTEXT
// =============================================================================
export const DisplayContext = createContext<TDisplayContext>({
    state: DEFAULT_DISPLAY_VALUES,
    dispatch: noop,
});

// =============================================================================
// CONTEXT PROVIDER
// =============================================================================
export const DisplayProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useImmerReducer(
        displayReducer,
        DEFAULT_DISPLAY_VALUES
    );

    return (
        <DisplayContext.Provider value={{ state, dispatch }}>
            {children}
        </DisplayContext.Provider>
    );
};
