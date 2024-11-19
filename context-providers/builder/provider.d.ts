/// <reference types="react" />
import { IBuilderState, TBuilderAction, TBuilderContext } from "./types";
export declare const builderReducer: (state: IBuilderState, action: TBuilderAction) => IBuilderState;
export declare const BuilderContext: import("react").Context<TBuilderContext>;
export declare const BuilderProvider: ({ children, }: {
    children: React.ReactNode;
}) => JSX.Element;
