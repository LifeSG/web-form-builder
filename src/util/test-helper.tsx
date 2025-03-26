import { yupResolver } from "@hookform/resolvers/yup";
import { V2_BaseTheme } from "@lifesg/react-design-system";
import { noop } from "lodash";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
    BuilderContext,
    DisplayContext,
    EBuilderMode,
    EElementType,
    ConfigContext,
    IBuilderState,
    IDisplayState,
    IConfigState,
} from "src/context-providers";
import { YupSchemaBuilder } from "src/yup-schemas";
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
        configContext?: Partial<IConfigState>;
        builderContext?: Partial<IBuilderState>;
        displayContext?: Partial<IDisplayState>;
        formContext?: FormContextProps;
        includeFormProvider?: boolean;
    }

    export const withProviders = (
        {
            configContext = {},
            builderContext,
            displayContext,
            formContext,
            includeFormProvider = true,
        }: RenderOptions = {},
        component: React.ReactNode
    ) => {
        return (
            (<ThemeProvider theme={V2_BaseTheme}>
                <ConfigContext.Provider value={configContext}>
                    <BuilderContext.Provider
                        value={{
                            state: { ...mockBuilderState, ...builderContext },
                            dispatch: noop,
                        }}
                    >
                        <DisplayContext.Provider
                            value={{
                                state: {
                                    ...mockDisplayState,
                                    ...displayContext,
                                },
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
                </ConfigContext.Provider>
            </ThemeProvider>)
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
                YupSchemaBuilder.buildYupSchema(
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
