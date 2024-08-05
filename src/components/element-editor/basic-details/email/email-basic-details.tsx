import {
    Description,
    Id,
    Label,
    MandatoryField,
    Placeholder,
    PreselectedValueTextBased,
    Type,
} from "../common";

export const EmailBasicDetails = () => {
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
