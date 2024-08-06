import { Pills } from "src/components/common/pills";
import {
    DescriptionField,
    IdField,
    LabelField,
    MandatoryField,
    PlaceholderField,
    TextBasedPreselectedValueField,
    TypeField,
} from "../common";
import { ResizableInput } from "./resizable-input";

export const LongTextBasicDetails = () => {
    return (
        <>
            <TypeField />
            <LabelField />
            <MandatoryField />
            <IdField />
            <DescriptionField />
            <ResizableInput />
            <Pills />
            <PlaceholderField />
            <TextBasedPreselectedValueField />
        </>
    );
};
