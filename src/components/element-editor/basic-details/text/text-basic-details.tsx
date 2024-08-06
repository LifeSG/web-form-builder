import {
    Description,
    Id,
    Label,
    MandatoryField,
    Placeholder,
    TextBasedPreselectedValue,
    Type,
} from "../common";

export const TextBasicDetails = () => {
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
