import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
    EElementType,
    EToastTypes,
    IDropdownItemAttributes,
    IPillItemAttributes,
    TElement,
    useDisplay,
} from "src/context-providers";
import { SchemaHelper } from "src/yup-schemas";
import { EBuilderMode, useBuilder } from "../../context-providers";
import { ElementEditor } from "../element-editor";
import { AddElementsPanel } from "./add-elements-panel";
import { SidePanelHeader } from "./side-panel-header";
import { ContentSection, ContentWrapper, Wrapper } from "./side-panel.styles";
import { Toolbar } from "./toolbar";

interface IProps {
    offset?: number;
    onSubmit?: (formData: TElement) => Promise<unknown>;
}

export const SidePanel = ({ offset, onSubmit }: IProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const {
        showSidePanel,
        currentMode,
        focusedElement,
        updateElement,
        updateFocusedElement,
        selectedElementType,
        toggleSubmitting,
    } = useBuilder();
    const { showToast } = useDisplay();
    const schema = SchemaHelper.buildSchema(
        selectedElementType || EElementType.EMAIL
    );
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        defaultValues: focusedElement?.element,
    });
    const {
        getValues,
        formState: { isSubmitSuccessful },
    } = methods;
    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const onFormSubmit = useCallback(
        async (values: TElement) => {
            if (onSubmit) {
                toggleSubmitting(true);
                await onSubmit(values);
                toggleSubmitting(false);
            }
            const newToast = {
                message: "Changes are saved successfully.",
                type: EToastTypes.SUCCESS_TOAST,
            };
            /** Remove empty dropdown items before updating element */
            if ("dropdownItems" in values) {
                const nonEmptyDropdownItems = (
                    getValues("dropdownItems") as IDropdownItemAttributes[]
                ).filter(
                    (item) => item.label.length > 0 || item.value.length > 0
                );
                values.dropdownItems = nonEmptyDropdownItems;
            }

            if ("pillItems" in values) {
                const validPillItems = (
                    getValues("pillItems") as IPillItemAttributes[]
                ).filter((item) => item.content.length > 0);
                values.pillItems = validPillItems;
            }

            updateElement(values);
            updateFocusedElement(false, values);
            showToast(newToast);
        },
        [updateElement, updateFocusedElement, onSubmit]
    );
    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        if (isSubmitSuccessful) {
            /**
             * On React 17, without setTimeout, isSubmitSuccessful is set to true again on first touch of the form after resetting form.
             * This issue is fixed on React 18, but the workaround on React 17 would be to use setTimeout.
             */
            setTimeout(() => methods.reset());
        }
    }, [isSubmitSuccessful, methods.reset]);

    useEffect(() => {
        if (!focusedElement) {
            return;
        }
        methods.reset(focusedElement.element);
    }, [focusedElement?.element, methods.reset]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderPanelContent = () => {
        if (focusedElement) {
            return <ElementEditor />;
        }
        switch (currentMode) {
            case EBuilderMode.ADD_ELEMENT:
                return <AddElementsPanel />;
            default:
                return (
                    <div data-testid="default-content">
                        Some content here...
                    </div>
                );
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onFormSubmit)}>
                <Wrapper
                    $minimised={focusedElement ? false : !showSidePanel}
                    $offset={offset ? offset : 0}
                >
                    <SidePanelHeader />
                    <ContentWrapper>
                        <ContentSection
                            $isFocusedElement={focusedElement ? true : false}
                        >
                            {renderPanelContent()}
                        </ContentSection>
                        {focusedElement === null && <Toolbar />}
                    </ContentWrapper>
                </Wrapper>
            </form>
        </FormProvider>
    );
};
