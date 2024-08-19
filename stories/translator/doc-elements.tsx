import { Text } from "@lifesg/react-design-system/text";
import { EyeIcon } from "@lifesg/react-icons/eye";
import { PencilIcon } from "@lifesg/react-icons/pencil";
import { TabletIcon } from "@lifesg/react-icons/tablet";
import { FrontendEngine } from "@lifesg/web-frontend-engine";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormBuilder, IFormBuilderMethods } from "src/form-builder";
import { ISchemaProps } from "src/translator/types";
import {
    ActionWrapper,
    AlertWrapper,
    ContentWrapper,
    IconButton,
    IconWrapper,
    SaveButton,
    SchemaPreview,
    ViewWrapper,
} from "./doc-elements.styles";

interface IProps {
    data?: ISchemaProps;
}

interface ISchemaViewProps {
    data?: ISchemaProps;
    onChange?: (schema: ISchemaProps) => void;
    formBuilderRef: React.MutableRefObject<IFormBuilderMethods>;
}

const FormPreview = ({ data }: IProps) => {
    return (
        <ViewWrapper>
            <Text.H2>Generate Form</Text.H2>
            {data && <FrontendEngine data={data.schema} />}
        </ViewWrapper>
    );
};

const SchemaView = ({ data, onChange, formBuilderRef }: ISchemaViewProps) => {
    // ===========================================================================
    // CONST, STATE, REFS
    // ===========================================================================
    const [hasError, setHasError] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty },
    } = useForm({
        defaultValues: { schema: "" },
    });

    // =========================================================================
    // EFFECTS
    // =========================================================================

    useEffect(() => {
        if (data) {
            const schemaString = JSON.stringify(data, null, 2);
            reset({ schema: schemaString });
        }
    }, [data, reset]);

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const onSubmit = (formData: { schema: string }) => {
        let newSchema: ISchemaProps;
        try {
            newSchema = JSON.parse(formData.schema);
            formBuilderRef.current.parseSchema(newSchema);

            setHasError(false);
        } catch (error) {
            console.log(error);
            setHasError(true);
            return;
        }
        onChange(newSchema);
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderActionPanel = () => (
        <ActionWrapper>
            {isDirty && (
                <>
                    {hasError ? (
                        <AlertWrapper type="error" showIcon>
                            Unable to save changes because there’s syntax error.
                            Amend the error or{" "}
                            <a
                                onClick={() => {
                                    reset();
                                    setHasError(false);
                                }}
                            >
                                refresh to sync with the form builder.
                            </a>
                        </AlertWrapper>
                    ) : (
                        <AlertWrapper type="warning" showIcon>
                            To reflect changes on preview, save changes first.
                        </AlertWrapper>
                    )}
                </>
            )}
            <SaveButton onClick={handleSubmit(onSubmit)}>
                {isDirty ? "Save Changes" : "Saved"}
            </SaveButton>
        </ActionWrapper>
    );

    return (
        <ViewWrapper>
            <Text.H2>Generate Schema</Text.H2>
            {renderActionPanel()}
            <SchemaPreview {...register("schema")} />
        </ViewWrapper>
    );
};

export const DocElement = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const formBuilderRef = useRef<IFormBuilderMethods>(null);
    const [pageMode, setPageMode] = useState<string>("form-builder-mode");
    const [schema, setSchema] = useState<ISchemaProps | null>(null);

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleFormBuilderButton = () => {
        if (formBuilderRef.current && schema) {
            formBuilderRef.current.parseSchema(schema);
        }
        setPageMode("form-builder-mode");
    };

    const handleFormPreviewButton = () => {
        if (pageMode === "form-builder-mode") {
            const generatedSchema = formBuilderRef.current.generateSchema();
            setSchema(generatedSchema);
        } else if (pageMode === "schema-mode") {
            formBuilderRef.current.parseSchema(schema);
        }
        setPageMode("preview-mode");
    };

    const handleSchemaViewButton = () => {
        const generatedSchema = formBuilderRef.current.generateSchema();
        setSchema(generatedSchema);
        setPageMode("schema-mode");
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <>
            <IconWrapper>
                <IconButton
                    $active={pageMode === "form-builder-mode"}
                    onClick={handleFormBuilderButton}
                    type="button"
                >
                    <PencilIcon />
                </IconButton>
                <IconButton
                    $active={pageMode === "preview-mode"}
                    onClick={handleFormPreviewButton}
                    type="button"
                >
                    <EyeIcon />
                </IconButton>
                <IconButton
                    $active={pageMode === "schema-mode"}
                    onClick={handleSchemaViewButton}
                    type="button"
                >
                    <TabletIcon />
                </IconButton>
            </IconWrapper>
            <ContentWrapper $visible={pageMode === "form-builder-mode"}>
                <FormBuilder ref={formBuilderRef} offset={5.1} />
            </ContentWrapper>
            {pageMode === "preview-mode" && (
                <ContentWrapper>
                    <FormPreview data={schema} />
                </ContentWrapper>
            )}
            {pageMode === "schema-mode" && (
                <ContentWrapper>
                    <SchemaView
                        data={schema}
                        onChange={setSchema}
                        formBuilderRef={formBuilderRef}
                    />
                </ContentWrapper>
            )}
        </>
    );
};
