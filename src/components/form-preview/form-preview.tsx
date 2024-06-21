import { FrontendEngine } from "@lifesg/web-frontend-engine";
import { IFrontendEngineData } from "@lifesg/web-frontend-engine/components/types";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { TElementMap } from "src/context-providers/builder";
import { generateSchema, translateSchema } from "src/util/schema-translator";
import { PreviewWrapper } from "./form-preview.styles";

interface IProps {
    elements: TElementMap;
}

export const FormPreview = ({ elements }: IProps) => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const useTranslator = (
        ref: React.Ref<{
            generate: (elements: TElementMap) => IFrontendEngineData;
            translate: (text: string) => void;
        }>
    ) => {
        useImperativeHandle(
            ref,
            () => ({
                generate: generateSchema,
                translate: translateSchema,
            }),
            []
        );
    };
    const translatorRef = useRef<{
        generate: (elements: TElementMap) => IFrontendEngineData;
        translate: (text: string) => void;
    } | null>(null);
    const [schema, setSchema] = useState<IFrontendEngineData | null>(null);

    useTranslator(translatorRef);

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        if (translatorRef.current) {
            const generatedSchema = translatorRef.current.generate(elements);
            setSchema(generatedSchema);
        }
    }, [translatorRef.current]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <PreviewWrapper>
            {schema !== null && <FrontendEngine data={schema} />}
        </PreviewWrapper>
    );
};
