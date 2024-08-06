import {
    Description,
    Id,
    Label,
    MandatoryField,
    Placeholder,
    TextBasedPreselectedValue,
    Type,
} from "../common";

export const NumericBasicDetails = () => {
    return (
        <>
            <Type />
            <Label />
            <MandatoryField />
            <Id />
            <Description />
            <Placeholder />
            <TextBasedPreselectedValue />
        </>
    );
};
