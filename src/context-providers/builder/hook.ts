import { useContext } from "react";
import { BuilderContext } from "./provider";

export const useBuilder = () => {
    const { state } = useContext(BuilderContext);

    return {
        state,
    };
};
