/// <reference types="react" />
import { IDisplayState, TDisplayAction, TDisplayContext } from "./types";
export declare const displayReducer: (state: IDisplayState, action: TDisplayAction) => IDisplayState;
export declare const DisplayContext: import("react").Context<TDisplayContext>;
export declare const DisplayProvider: ({ children, }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
