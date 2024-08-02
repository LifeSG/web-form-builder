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
    console.log("EmailBasicDetails");
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
