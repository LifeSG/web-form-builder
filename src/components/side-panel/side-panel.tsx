import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
    EElementType,
    EToastTypes,
    TElement,
    useDisplay,
} from "src/context-providers";
import {
    SchemaHelper,
    TOverallOptionGroupBasedSchema,
    TOverallTextBasedSchema,
    TFormFieldValues,
    TYupSchema,
    TOverallOptionGroupBasedYupSchema,
} from "src/schemas";
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        showSidePanel,
        currentMode,
        focusedElement,
        updateElement,
        updateFocusedElement,
        selectedElementType,
    } = useBuilder();
    const { showToast } = useDisplay();
    const schema = SchemaHelper.buildSchema(selectedElementType);

    // here we defined schema to be many types. Subsequently we need to narrow down to which type it is.
    const methods = useForm({
        mode: "onTouched",
        // TODO: insert proper type; email is a placeholder
        resolver: yupResolver(schema),
    });

    const {
        getValues,
        formState: { defaultValues, errors },
        setValue,
    } = methods;
    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const removeEmptyDropDownItems = () => {
        const nonEmptyDropDownItems = getValues("dropdownItems").filter(
            (item) => item.label.length > 0 || item.value.length > 0
        );
        try {
            if ("dropdownItems" in schema.fields) {
                const validationSchema = (
                    schema as TOverallOptionGroupBasedYupSchema
                ).pick(["dropdownItems"]);
                validationSchema.validateSync({
                    dropdownItems: nonEmptyDropDownItems,
                    abortEarly: false,
                });
            }
        } catch (error) {
            return;
        }
        setValue("dropdownItems", nonEmptyDropDownItems);
    };

    const onClickSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            getValues("type") === EElementType.DROPDOWN &&
            Object.keys(errors).length === 0
        ) {
            removeEmptyDropDownItems();
        }
        methods.handleSubmit(onFormSubmit)();
    };

    const onFormSubmit = useCallback(
        async (values) => {
            if (onSubmit) {
                setIsSubmitting(true);
                await onSubmit(values);
                setIsSubmitting(false);
            }
            const newToast = {
                message: "Changes are saved successfully.",
                type: EToastTypes.SUCCESS_TOAST,
            };
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
        methods.reset(undefined, {
            keepValues: true,
            keepDirty: false,
        });
    }, [methods.formState.isSubmitSuccessful]);

    useEffect(() => {
        console.log("DEFAULT VALS", defaultValues);
        console.log("GET VALS", getValues());
    }, [methods.formState]);

    useEffect(() => {
        if (focusedElement) {
            console.log("FOCUSED ELEMENT", focusedElement);
            const newElement = {};
            Object.entries(focusedElement?.element).forEach(([key, value]) => {
                newElement[key] = value === undefined ? "" : value;
            });
            methods.reset(newElement);
        }
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
            <form
                onSubmit={onClickSaveChanges}
                {...{ inert: isSubmitting ? "" : undefined }}
            >
                <Wrapper
                    $minimised={focusedElement ? false : !showSidePanel}
                    $offset={offset ? offset : 0}
                >
                    <SidePanelHeader isSubmitting={isSubmitting} />
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
