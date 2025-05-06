import { IRadioButtonAttributes } from "src/context-providers";
export declare namespace RadioButtonGenerator {
    const elementToSchema: (element: IRadioButtonAttributes) => {
        [x: string]: {
            options: import("src/context-providers").IOptionAttributes[];
            placeholder: string;
            showIf: import("@lifesg/web-frontend-engine/context-providers").TRenderRules[];
            validation: {
                errorMessage: string;
                required: boolean;
            }[];
            label: {
                subLabel: string;
                mainLabel: string;
            };
            uiType: import("src/context-providers").EElementType;
            columns: {
                desktop: (12 | ((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | 9 | 10 | 11) | [(12 | ((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | 9 | 10 | 11) | 13, (12 | ((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | 9 | 10 | 11) | 13];
                tablet: ((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | [((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | 9, ((1 | 2 | 3 | 4) | 5 | 6 | 7 | 8) | 9];
                mobile: (1 | 2 | 3 | 4) | [(1 | 2 | 3 | 4) | 5, (1 | 2 | 3 | 4) | 5];
            };
        };
    };
}
