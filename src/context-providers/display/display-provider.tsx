import noop from "lodash/noop";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { IDisplayState, TDisplayAction, TDisplayContext } from "./types";

// =============================================================================
// DEFAULT VALUES
// =============================================================================
const DEFAULT_DISPLAY_VALUES: IDisplayState = {
    toasts: [],
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
            state.toasts = [...state.toasts, action.payload];
            break;
        }
        case "dismiss-toast": {
            const toastQueue = [...state.toasts];
            const newToastQueue = toastQueue.filter(
                (toast) => toast.id !== action.payload
            );
            state.toasts = newToastQueue;
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
