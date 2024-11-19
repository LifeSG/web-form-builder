import { ITextareaAttributes } from "src/context-providers";
export declare namespace LongTextSchemaGenerator {
    const elementToSchema: (element: ITextareaAttributes) => {
        [x: string]: {
            chipPosition: "bottom";
            chipTexts: string[];
            resizable: boolean;
            validation: import("../../types").ISchemaValidation[];
            placeholder: string;
            showIf: import("@lifesg/web-frontend-engine/context-providers").TRenderRules[];
            label: {
                subLabel: string;
                mainLabel: string;
            };
            uiType: import("src/context-providers").EElementType;
            columns: {
                desktop: (((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | 9 | 10 | 11 | 12) | [(((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | 9 | 10 | 11 | 12) | 13, (((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | 9 | 10 | 11 | 12) | 13];
                tablet: ((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | [((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | 9, ((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | 9];
                mobile: (1 | 2 | 3 | 4) | [(1 | 2 | 3 | 4) | 5, (1 | 2 | 3 | 4) | 5];
            };
        };
    };
}
