// import { IFrontendEngineData } from "@lifesg/web-frontend-engine";
// import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { MainPanel } from "./components";
import SidePanel from "./components/side-panel/side-panel";
// import { Modals, Toasts } from "./components/common";
// import { ScreenNotSupportedErrorDisplay } from "./components/error-display/screen-not-supported-error";
// import { DisplayProvider } from "./context-providers";
// import {
//     BuilderProvider,
//     IPrefillAttributes,
//     TElementMap,
//     useBuilder,
// } from "./context-providers/builder";
// import { Container, Wrapper } from "./form-builder.styles";
// import { Translator } from "./translator/translator";

// interface IPrefillSchema {
//     [key: string]: IPrefillAttributes | IPrefillAttributes[]
// }
// export interface ISchemaProps {
//     schema: IFrontendEngineData;
//     prefill: IPrefillSchema
// }

// export interface IFormBuilderMethods {
//     generateSchema: (elementsList?: TElementMap) => ISchemaProps;
//     translateSchema: (schema: string) => void;
// }

// interface IProps {
//     offset?: number;
// }

const Component = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    // const [isLargeScreen, setIsLargeScreen] = useState(
    //     window.innerWidth >= 1200
    // );
    // const { elements } = useBuilder();

    // useImperativeHandle(
    //     ref,
    //     () => ({
    //         generateSchema: () => Translator.generateSchema(elements),
    //         translateSchema: (schema: string) => Translator.translateSchema(schema),
    //     }),
    //     [elements]
    // );

    // // =========================================================================
    // // EFFECTS
    // // =========================================================================
    // useEffect(() => {
    //     if (window) {
    //         const handleResize = () => {
    //             setIsLargeScreen(window.innerWidth >= 1200);
    //         };
    //         window.addEventListener("resize", handleResize);
    //         return () => {
    //             window.removeEventListener("resize", handleResize);
    //         };
    //     }
    // }, []);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <SidePanel/>
    );
};

export const FormBuilder = () => {
        return (
            <Component/>
        );
    }

