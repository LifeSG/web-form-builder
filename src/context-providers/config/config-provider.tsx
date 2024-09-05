import React, { createContext, ReactNode } from "react";
import { IFormBuilderConfig } from "./types";

export const ConfigContext = createContext<IFormBuilderConfig>({});

export const ConfigProvider: React.FC<{
    children: ReactNode;
    value: IFormBuilderConfig;
}> = ({ children, value }) => {
    return (
        <ConfigContext.Provider value={value || {}}>
            {children}
        </ConfigContext.Provider>
    );
};
