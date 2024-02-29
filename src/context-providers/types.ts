import { Dispatch } from "react";

export type TContextType<State, Action> = {
    state: State;
    dispatch: Dispatch<Action>;
};
