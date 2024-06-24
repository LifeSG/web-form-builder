import { Text } from "@lifesg/react-design-system";
import { EyeIcon, PencilIcon, TabletIcon } from "@lifesg/react-icons";
import {
    FrontendEngine,
    IFrontendEngineData,
} from "@lifesg/web-frontend-engine";
import { useEffect, useRef, useState } from "react";
import { FormBuilder, IFormBuilderMethods } from "src/form-builder";
import {
    ContentWrapper,
    IconButton,
    IconWrapper,
    PreviewWrapper,
    SchemaPreview,
    SchemaViewWrapper,
} from "./doc-elements.styles";

interface IProps {
    data?: IFrontendEngineData;
}

const FormPreview = ({ data }: IProps) => {
    return (
        <PreviewWrapper>
            <Text.H2>Generate Form</Text.H2>
            {data && <FrontendEngine data={data} />}
        </PreviewWrapper>
    );
};

const SchemaView = ({ data }: IProps) => {
    return (
        <SchemaViewWrapper>
            <Text.H2>Generate Schema</Text.H2>
            <SchemaPreview>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </SchemaPreview>
        </SchemaViewWrapper>
    );
};

export const DocElement = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const formBuilderRef = useRef<IFormBuilderMethods>(null);
    const [pageMode, setPageMode] = useState<string>("form-builder-mode");
    const [schema, setSchema] = useState<IFrontendEngineData | null>(null);

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleFormBuilderButton = (event) => {
        event.preventDefault();
        setPageMode("form-builder-mode");
    };

    const handleFormPreviewButton = (event) => {
        event.preventDefault();
        setPageMode("preview-mode");
    };

    const handleSchemaViewButton = (event) => {
        event.preventDefault();
        setPageMode("schema-mode");
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        if (formBuilderRef.current) {
            const generatedSchema = formBuilderRef.current?.generate();
            setSchema(generatedSchema);
        }
    }, [formBuilderRef.current, pageMode]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <>
            <IconWrapper>
                <IconButton
                    $active={pageMode === "form-builder-mode"}
                    onClick={handleFormBuilderButton}
                >
                    <PencilIcon />
                </IconButton>
                <IconButton
                    $active={pageMode === "preview-mode"}
                    onClick={handleFormPreviewButton}
                >
                    <EyeIcon />
                </IconButton>
                <IconButton
                    $active={pageMode === "schema-mode"}
                    onClick={handleSchemaViewButton}
                >
                    <TabletIcon />
                </IconButton>
            </IconWrapper>
            <ContentWrapper visible={pageMode === "form-builder-mode"}>
                <FormBuilder ref={formBuilderRef} offset={5.1} />
            </ContentWrapper>
            <ContentWrapper visible={pageMode === "preview-mode"}>
                <FormPreview data={schema} />
            </ContentWrapper>
            <ContentWrapper visible={pageMode === "schema-mode"}>
                <SchemaView data={schema} />
            </ContentWrapper>
        </>
    );
};
