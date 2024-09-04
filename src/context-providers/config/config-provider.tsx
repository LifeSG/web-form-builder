import React, { createContext, ReactNode, useContext } from "react";
import { IConfigState } from "./types";

export const ConfigContext = createContext<IConfigState>({});

export const ConfigProvider: React.FC<{
    children: ReactNode;
    value: IConfigState;
}> = ({ children, value }) => {
    return (
        <ConfigContext.Provider value={value || {}}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfigContext = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error(
            "useFormBuilderConfigContext must be used within a FormBuilderConfigContext"
        );
    }
    return context;
};
