import { IFrontendEngineData } from "@lifesg/web-frontend-engine";
import { IPrefillAttributes } from "src/context-providers";

export interface IPrefillConfig {
    [key: string]: IPrefillAttributes | IPrefillAttributes[];
}

export interface ISchemaProps {
    schema: IFrontendEngineData;
    prefill: IPrefillConfig;
}
