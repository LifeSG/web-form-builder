import { yupResolver } from "@hookform/resolvers/yup";
import { BaseTheme } from "@lifesg/react-design-system";
import { noop } from "lodash";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
    BuilderContext,
    DisplayContext,
    EBuilderMode,
    EElementType,
    IBuilderState,
    IDisplayState,
} from "src/context-providers";
import { SchemaHelper } from "src/schemas";
import { ThemeProvider } from "styled-components";

const mockBuilderState: IBuilderState = {
    mode: EBuilderMode.ADD_ELEMENT,
    elements: {},
    focusedElement: null,
    showSidePanel: true,
    orderedIdentifiers: [],
    deletedElements: {},
    elementCounter: 0,
    isSubmitting: false,
    selectedElementType: null,
};

const mockDisplayState: IDisplayState = {
    toasts: [],
    modals: [],
};

interface FormContextProps {
    elementType?: EElementType;
    defaultValues?: {
        [x: string]: any;
    };
    currentValues?: {
        [x: string]: any;
    };
}

export namespace TestHelper {
    export interface RenderOptions {
        builderContext?: Partial<IBuilderState>;
        displayContext?: Partial<IDisplayState>;
        formContext?: FormContextProps;
        includeFormProvider?: boolean;
    }

    export const withProviders = (
        {
            builderContext,
            displayContext,
            formContext,
            includeFormProvider = true,
        }: RenderOptions = {},
        component: React.ReactNode
    ) => {
        return (
            <ThemeProvider theme={BaseTheme}>
                <BuilderContext.Provider
                    value={{
                        state: { ...mockBuilderState, ...builderContext },
                        dispatch: noop,
                    }}
                >
                    <DisplayContext.Provider
                        value={{
                            state: { ...mockDisplayState, ...displayContext },
                            dispatch: noop,
                        }}
                    >
                        {includeFormProvider ? (
                            <InnerFormProvider
                                formContext={formContext}
                                selectedElementType={
                                    builderContext?.selectedElementType
                                }
                            >
                                {component}
                            </InnerFormProvider>
                        ) : (
                            component
                        )}
                    </DisplayContext.Provider>
                </BuilderContext.Provider>
            </ThemeProvider>
        );
    };

    const InnerFormProvider = ({
        formContext,
        selectedElementType,
        children,
    }: {
        formContext?: FormContextProps;
        selectedElementType?: EElementType;
        children: React.ReactNode;
    }) => {
        const methods = useForm({
            mode: "onTouched",
            resolver: yupResolver(
                SchemaHelper.buildSchema(
                    selectedElementType || EElementType.EMAIL
                )
            ),
            defaultValues: formContext?.defaultValues,
        });
        if (formContext?.currentValues) {
            Object.keys(formContext.currentValues).forEach((key) => {
                methods.setValue(key, formContext.currentValues[key]);
            });
        }
        const onSubmit = jest.fn;
        return (
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </FormProvider>
        );
    };
}
