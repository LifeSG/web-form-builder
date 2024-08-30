import React from "react";
import { EElementType, IBuilderState, IDisplayState } from "src/context-providers";
interface FormContextProps {
    elementType?: EElementType;
    defaultValues?: {
        [x: string]: any;
    };
    currentValues?: {
        [x: string]: any;
    };
}
export declare namespace TestHelper {
    interface RenderOptions {
        builderContext?: Partial<IBuilderState>;
        displayContext?: Partial<IDisplayState>;
        formContext?: FormContextProps;
        includeFormProvider?: boolean;
    }
    const withProviders: ({ builderContext, displayContext, formContext, includeFormProvider, }: RenderOptions, component: React.ReactNode) => JSX.Element;
}
export {};
