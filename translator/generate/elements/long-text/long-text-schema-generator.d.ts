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
                desktop: ((6 | (1 | 2 | 3 | 4) | 5 | 7 | 8) | 9 | 10 | 11 | 12) | [((6 | (1 | 2 | 3 | 4) | 5 | 7 | 8) | 9 | 10 | 11 | 12) | 13, ((6 | (1 | 2 | 3 | 4) | 5 | 7 | 8) | 9 | 10 | 11 | 12) | 13];
                tablet: (6 | (1 | 2 | 3 | 4) | 5 | 7 | 8) | [(6 | (1 | 2 | 3 | 4) | 5 | 7 | 8) | 9, (6 | (1 | 2 | 3 | 4) | 5 | 7 | 8) | 9];
                mobile: (1 | 2 | 3 | 4) | [(1 | 2 | 3 | 4) | 5, (1 | 2 | 3 | 4) | 5];
            };
        };
    };
}
