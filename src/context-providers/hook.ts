import { useContext } from "react";
import { MainContext } from "./provider";

export const useMainContext = () => {
    const { state, dispatch } = useContext(MainContext);

    return {
        state,
    };
};
