import { Text } from "@lifesg/react-design-system/text";
import { EyeIcon } from "@lifesg/react-icons/eye";
import { PencilIcon } from "@lifesg/react-icons/pencil";
import { TabletIcon } from "@lifesg/react-icons/tablet";
import { FrontendEngine } from "@lifesg/web-frontend-engine";
import { useEffect, useRef, useState } from "react";
import {
    FormBuilder,
    IFormBuilderMethods,
    ISchemaProps,
} from "src/form-builder";
import {
    ContentWrapper,
    IconButton,
    IconWrapper,
    SchemaPreview,
    ViewWrapper,
} from "./doc-elements.styles";

interface IProps {
    data?: ISchemaProps;
}

interface ISchemaViewProps {
    data?: ISchemaProps;
    setSchemaFromView?: (schema: ISchemaProps) => void;
}

const FormPreview = ({ data }: IProps) => {
    return (
        <ViewWrapper>
            <Text.H2>Generate Form</Text.H2>
            {data && <FrontendEngine data={data.schema} />}
        </ViewWrapper>
    );
};

const SchemaView = ({ data, setSchemaFromView }: ISchemaViewProps) => {
    const [schema, setSchema] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSchema(event.target.value);
    };

    const handleBlur = () => {
        if (setSchemaFromView) {
            const newSchema = JSON.parse(schema);
            setSchemaFromView(newSchema);
        }
    };

    useEffect(() => {
        if (data && setSchemaFromView) {
            const dataToString = JSON.stringify(data, null, 2);
            setSchema(dataToString);
        }
    }, [data]);

    return (
        <ViewWrapper>
            <Text.H2>Generate Schema</Text.H2>
            <SchemaPreview
                value={schema}
                onChange={handleChange}
                onBlur={handleBlur}
            />
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
        setPageMode("preview-mode");
    };

    const handleSchemaViewButton = () => {
        setPageMode("schema-mode");
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        if (formBuilderRef.current && pageMode !== "form-builder-mode") {
            const generatedSchema = formBuilderRef.current?.generateSchema();
            setSchema(generatedSchema);
        } else if (formBuilderRef.current && schema) {
            formBuilderRef.current?.parseSchema(schema);
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
                    <SchemaView data={schema} setSchemaFromView={setSchema} />
                </ContentWrapper>
            )}
        </>
    );
};
