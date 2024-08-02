import {
    Description,
    Id,
    Label,
    MandatoryField,
    Placeholder,
    PreselectedValueTextBased,
    Type,
} from "../common";

export const ContactBasicDetails = () => {
    return (
        <>
            <Type />
            <Label />
            <MandatoryField />
            <Id />
            <Description />
            <Placeholder />
            <PreselectedValueTextBased />
        </>
    );
};
