import { IFrontendEngineData } from "@lifesg/web-frontend-engine";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
    MainPanel,
    Modals,
    ScreenNotSupportedErrorDisplay,
    SidePanel,
    Toasts,
} from "./components";
import {
    BuilderProvider,
    ConfigProvider,
    DisplayProvider,
    IFormBuilderConfig,
    TElement,
    TElementMap,
    useBuilder,
    usePresetForm,
    useShouldShowPrefill,
} from "./context-providers";
import { Container, Wrapper } from "./form-builder.styles";
import { ISchemaProps, Translator } from "./translator";

export interface IFormBuilderMethods {
    generateSchema: (elementsList?: TElementMap) => ISchemaProps;
    parseSchema: (schema: ISchemaProps) => void;
}

interface IProps {
    offset?: number;
    onSubmit?: (formData: TElement) => Promise<unknown>;
    config?: IFormBuilderConfig;
}

const Component = forwardRef<IFormBuilderMethods, IProps>(
    ({ offset, onSubmit }, ref) => {
        // =========================================================================
        // CONST, STATE, REFS
        // =========================================================================
        const [isLargeScreen, setIsLargeScreen] = useState(
            window.innerWidth >= 1200
        );
        const {
            elements,
            updateElementSchema,
            orderedIdentifiers,
            isSubmitting,
            removeFocusedElement,
            focusedElement,
        } = useBuilder();

        const shouldShowPrefill = useShouldShowPrefill();
        const presetForm = usePresetForm();

        useImperativeHandle(
            ref,
            () => ({
                generateSchema: () =>
                    Translator.generateSchema(elements, orderedIdentifiers, {
                        shouldShowPrefill,
                    }),
                parseSchema: (schema: ISchemaProps) => {
                    const { newOrderedIdentifiers, newElements } =
                        Translator.parseSchema(schema, { shouldShowPrefill }) ||
                        {};

                    // If there are no elements in schema, clear the form and remove focused element
                    if (!newOrderedIdentifiers || !newElements) {
                        updateElementSchema({}, []);
                        removeFocusedElement();
                        return;
                    }

                    const newFocusedElement = Object.values(newElements).find(
                        (element) => element.id === focusedElement?.element?.id
                    );
                    updateElementSchema(
                        newElements,
                        newOrderedIdentifiers,
                        newFocusedElement
                    );
                },
            }),
            [elements, orderedIdentifiers]
        );

        // =========================================================================
        // EFFECTS
        // =========================================================================
        useEffect(() => {
            if (window) {
                const handleResize = () => {
                    setIsLargeScreen(window.innerWidth >= 1200);
                };
                window.addEventListener("resize", handleResize);
                return () => {
                    window.removeEventListener("resize", handleResize);
                };
            }
        }, []);

        useEffect(() => {
            if (presetForm) {
                const elementsSchema: IFrontendEngineData = {
                    defaultValues: {},
                    sections: {
                        section: {
                            children: {
                                grid: {
                                    children: {
                                        ...presetForm,
                                    },
                                    uiType: "grid",
                                },
                                "submit-button": {
                                    disabled: "invalid-form",
                                    label: "Submit",
                                    uiType: "submit",
                                },
                            },
                            uiType: "section",
                        },
                    },
                };
                const schema = {
                    schema: elementsSchema,
                    prefill: {},
                };
                const { newOrderedIdentifiers, newElements } =
                    Translator.parseSchema(schema, { shouldShowPrefill }) || {};

                updateElementSchema(newElements, newOrderedIdentifiers);
            }
        }, []);

        // =========================================================================
        // RENDER FUNCTIONS
        // =========================================================================

        return (
            <Wrapper $disabled={isSubmitting}>
                {!isLargeScreen && <ScreenNotSupportedErrorDisplay />}
                <Container
                    type="grid"
                    stretch
                    $isLargeScreen={isLargeScreen}
                    {...{ inert: isSubmitting ? "" : undefined }}
                >
                    <Toasts />
                    <Modals />
                    <MainPanel />
                    <SidePanel offset={offset} onSubmit={onSubmit} />
                </Container>
            </Wrapper>
        );
    }
);

export const FormBuilder = forwardRef<IFormBuilderMethods, IProps>(
    (props, ref) => {
        return (
            <ConfigProvider value={props.config}>
                <BuilderProvider>
                    <DisplayProvider>
                        <Component ref={ref} {...props} />
                    </DisplayProvider>
                </BuilderProvider>
            </ConfigProvider>
        );
    }
);
