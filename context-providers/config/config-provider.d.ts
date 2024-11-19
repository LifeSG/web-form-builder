import React, { ReactNode } from "react";
import { IConfigState } from "./types";
export declare const ConfigContext: React.Context<IConfigState>;
export declare const ConfigProvider: React.FC<{
    children: ReactNode;
    value: IConfigState;
}>;
