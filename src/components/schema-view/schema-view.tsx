import { BoxContainer, Text } from "@lifesg/react-design-system";
import { IFrontendEngineData } from "@lifesg/web-frontend-engine/components/types";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { TElementMap } from "src/context-providers";
import { generateSchema, translateSchema } from "src/util/schema-translator";
import { SchemaViewWrapper } from "./schema-view.styles";

export interface IProps {
    elements: TElementMap;
}

export const SchemaView = ({ elements }: IProps) => {
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
        <SchemaViewWrapper>
            <BoxContainer title="Generate Schema" collapsible={false}>
                <div
                    style={{
                        width: 1000,
                        height: 1000,
                        overflow: "auto",
                        padding: "2rem",
                    }}
                >
                    <pre>{JSON.stringify(schema, null, 2)}</pre>
                </div>
            </BoxContainer>
        </SchemaViewWrapper>
    );
};
