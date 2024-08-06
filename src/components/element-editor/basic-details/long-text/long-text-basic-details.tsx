import { Pills } from "src/components/common/pills";
import {
    Description,
    Id,
    Label,
    MandatoryField,
    Placeholder,
    TextBasedPreselectedValue,
    Type,
} from "../common";
import { ResizableInput } from "./resizable-input";

export const LongTextBasicDetails = () => {
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
            <TextBasedPreselectedValue />
        </>
    );
};
