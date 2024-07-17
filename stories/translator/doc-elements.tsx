import { Text } from "@lifesg/react-design-system/text";
import { EyeIcon } from "@lifesg/react-icons/eye";
import { PencilIcon } from "@lifesg/react-icons/pencil";
import { TabletIcon } from "@lifesg/react-icons/tablet";
import { FrontendEngine } from "@lifesg/web-frontend-engine";
import { useRef, useState } from "react";
import {
    FormBuilder,
    IFormBuilderMethods,
    ISchemaProps,
} from "src/form-builder";
import {
    ContentWrapper,
    IconButton,
    IconWrapper,
    ViewWrapper,
    SchemaPreview,
} from "./doc-elements.styles";

interface IProps {
    data?: ISchemaProps;
}

const FormPreview = ({ data }: IProps) => {
    return (
        <ViewWrapper>
            <Text.H2>Generate Form</Text.H2>
            {data && <FrontendEngine data={data.schema} />}
        </ViewWrapper>
    );
};

const SchemaView = ({ data }: IProps) => {
    return (
        <ViewWrapper>
            <Text.H2>Generate Schema</Text.H2>
            <SchemaPreview>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </SchemaPreview>
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
        setPageMode("form-builder-mode");
    };

    const handleFormPreviewButton = () => {
        if (formBuilderRef.current) {
            const generatedSchema = formBuilderRef.current.generateSchema();
            setSchema(generatedSchema);
        }
        setPageMode("preview-mode");
    };

    const handleSchemaViewButton = () => {
        if (formBuilderRef.current) {
            const generatedSchema = formBuilderRef.current.generateSchema();
            setSchema(generatedSchema);
        }
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
                    <SchemaView data={schema} />
                </ContentWrapper>
            )}
        </>
    );
};
