import { useContext } from "react";
import { ConfigContext } from ".";

export const useConfigContext = () => {
    const context = useContext(ConfigContext);
    return context;
};
