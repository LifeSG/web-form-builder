import React, { createContext, ReactNode, useContext } from "react";
import { IFormBuilderConfig } from "./types";

const FormBuilderConfigContext = createContext<IFormBuilderConfig>({});

export const FormBuilderConfigProvider: React.FC<{
    children: ReactNode;
    value: IFormBuilderConfig;
}> = ({ children, value }) => {
    return (
        <FormBuilderConfigContext.Provider value={value || {}}>
            {children}
        </FormBuilderConfigContext.Provider>
    );
};

export const useFormBuilderConfigContext = () => {
    const context = useContext(FormBuilderConfigContext);
    if (context === undefined) {
        throw new Error(
            "useFormBuilderConfigContext must be used within a FormBuilderConfigContext"
        );
    }
    return context;
};
