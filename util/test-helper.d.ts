import React from "react";
import { EElementType, IBuilderState, IDisplayState, IConfigState } from "src/context-providers";
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
        configContext?: Partial<IConfigState>;
        builderContext?: Partial<IBuilderState>;
        displayContext?: Partial<IDisplayState>;
        formContext?: FormContextProps;
        includeFormProvider?: boolean;
    }
    const withProviders: ({ configContext, builderContext, displayContext, formContext, includeFormProvider, }: RenderOptions, component: React.ReactNode) => JSX.Element;
}
export {};
