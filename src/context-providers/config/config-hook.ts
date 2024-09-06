import { useContext } from "react";
import { ConfigContext } from "./config-provider";

export const useConfigContext = () => {
    const context = useContext(ConfigContext);
    return context;
};
