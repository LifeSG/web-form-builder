import { Pills } from "src/components/common/pills";
import {
    Description,
    Id,
    Label,
    MandatoryField,
    Placeholder,
    PreselectedValueTextBased,
    Type,
} from "../common";
import { ResizableInput } from "./resizable-input";

export const TextAreaBasicDetails = () => {
    return (
        <>
            <Type />
            <Label />
            <MandatoryField />
            <Id />
            <Description />
            <ResizableInput />
            <Pills />
            <Placeholder />
            <PreselectedValueTextBased />
        </>
    );
};
